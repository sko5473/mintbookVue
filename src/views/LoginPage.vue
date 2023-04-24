<template>
  <div id="login_wrap">
    <HeaderPage style="position: fixed; z-index: 300"></HeaderPage>
    <div id="login_content">
      <div class="logo">
        <img src="../assets/Navigation/logo.png" alt="logo" />
      </div>
      <div>
        <label for="id"></label>
        <input
          class="input"
          type="text"
          v-model="state.form.email"
          placeholder="이메일을 입력하세요."
        />
      </div>
      <div>
        <label for="pw"></label>
        <input
          class="input"
          type="password"
          v-model="state.form.password"
          placeholder="패스워드를 입력하세요."
        />
      </div>

      <div>
        <button @click="submit()" class="login_btn">로그인</button>
      </div>
      <!-- 네이버 로그인 버튼 노출 영역 -->
      <div id="naver_login_btn">
        <img src="../assets/Login/naverlogincircle.png" @click="naverLogin()" />
      </div>

      <div id="join_btn">
        <router-link to="/join"
          ><button class="join_btn">회원가입</button></router-link
        >
      </div>
    </div>
    <FooterPage></FooterPage>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import HeaderPage from "@/components/HeaderPage.vue";
import FooterPage from "@/components/FooterPage.vue";

export default {
  components: {
    HeaderPage: HeaderPage,
    FooterPage: FooterPage,
  },
  setup() {
    const state = reactive({
      form: {
        email: "",
        password: "",
      },
      accessToken: Cookies.get("accessToken"),
      refreshToken: Cookies.get("refreshToken"),
      naverClientId: "UWRvT59b1Pv1JV8c8_T4",
      naverCallbackUrl: "http://localhost:8080",
      naverstates: Math.random().toString(36).slice(2, 11),
    });
    const router = useRouter();

    // 네이버 로그인을 위한 url 이동
    const naverLogin = () => {
      const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${state.naverClientId}&redirect_uri=${state.naverCallbackUrl}&state=${state.naverstates}`;

      console.log("==================url====================");

      window.location.href = url;
    };

    const submit = async () => {
      await axios
        .post(`/api/members/login`, state.form)
        .then((res) => {
          console.log(res);
          window.alert("로그인에 성공하셨습니다.");

          //로그인 성공시 토큰(accessToken, grantType, refreshToken) 쿠키값 설정
          Cookies.set("accessToken", res.data.accessToken);
          Cookies.set("refreshToken", res.data.refreshToken);

          //로그인 성공시 홈으로 이동
          router.push({ path: "/" });
        })
        .catch((err) => {
          console.log(err);
          window.alert("로그인에 실패하셨습니다.");
        });
    };

    const api = axios.create({
      baseURL: "/api",
    });

    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshdata = await axios
            .post("/api/members/refreshcheck", {
              accessToken: Cookies.get("accessToken"),
              grantType: "Bearer",
              refreshToken: Cookies.get("refreshToken"),
            })
            .catch((err) => {
              window.alert("다시 로그인하세요.", err);
            });
          console.log("리프레쉬데이터", refreshdata);
          if (refreshdata == undefined) {
            console.log("refresh토큰이 만료되었습니다.");
            return Promise.reject(error);
          }
          try {
            const { data } = await api.post("/members/refreshaccesstoken", {
              accessToken: Cookies.get("accessToken"),
              grantType: "Bearer",
              refreshToken: Cookies.get("refreshToken"),
            });
            Cookies.set("accessToken", data.accessToken);
            originalRequest.headers.Authorization =
              "Bearer" + " " + Cookies.get("accessToken");
            return api(originalRequest);
          } catch (error) {
            console.log(error);
            window.alert("토큰 갱신에 실패했습니다. 재 로그인 하세요.");
            router.push("/login");
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );

    const memberVerify = async () => {
      await api
        .post("/members/baba", null, {
          headers: {
            Authorization: "Bearer" + " " + Cookies.get("accessToken"),
          },
        })
        .then((res) => {
          console.log(res);
          window.alert("회원인증에 성공하셨습니다.");
        })
        .catch((err) => {
          console.log(err);
          window.alert("회원인증에 실패하셨습니다.");
        });
    };

    return {
      state,
      submit,
      memberVerify,
      naverLogin,
    };
  },
};
</script>

<style lang="css" scoped>
#login_wrap {
  width: 1920px;
  margin: 0 auto;
  overflow: hidden;
}
#login_content {
  margin-top: 100px;
  text-align: center;
  padding: 70px;
}
#naver_login_btn > img {
  cursor: pointer;
  width: 60px;
  margin-top: 30px;
}
.input {
  height: 64px;
  outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
  -webkit-appearance: none; /* 브라우저별 기본 스타일링 제거 */
  -moz-appearance: none;
  appearance: none;
  border: 0.5px solid #c0c0c0;
  border-radius: 6px;
  padding-left: 10px;
  box-sizing: content-box;
  width: 527px;
  margin-bottom: 5px;
  font-size: 20px;
}

.logo {
  text-align: center;
}
.logo > img {
  width: 177px;
  margin-bottom: 80px;
}

.login_btn {
  width: 527px;
  height: 64px;
  border-radius: 6px;
  font-size: 24px;
  cursor: pointer;
  color: #fff;
  background-color: #3ddca3;
  border: none;
  margin-top: 25px;
}

.join_btn {
  width: 527px;
  height: 64px;
  border-radius: 6px;
  font-size: 24px;
  cursor: pointer;
  color: #3ddca3;
  background-color: #fff;
  border: none;
  margin-top: 25px;
  border: 1px solid #3ddca3;
}
</style>
