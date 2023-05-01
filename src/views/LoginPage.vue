<template>
  <div id="login_wrap">
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
          @keyup.enter="submit()"
        />
      </div>

      <div>
        <button @click="submit()" class="login_btn">로그인</button>
      </div>

      <div id="findIdPw" @click="state.modalState = 1">비밀번호 찾기</div>

      <!-- 네이버 로그인 버튼 노출 영역 -->
      <div id="naver_login_btn">
        <img src="../assets/Login/naverlogincircle.png" @click="naverLogin()" />
      </div>

      <div id="join_btn">
        <router-link to="/join"
          ><button class="join_btn">회원가입</button></router-link
        >
      </div>

      <!-- 비밀번호 찾기 모달 -->
      <div class="FindIdPwModal" v-if="state.modalState === 1">
        <div class="close_btn" @click="state.modalState = 0">X</div>
        <div class="findpw_title">비밀번호 찾기</div>
        <div>
          <input
            type="text"
            class="input"
            v-model="state.emailForPw"
            placeholder="가입시 등록한 이메일을 입력하세요."
            style="margin-top: 10px"
          />
        </div>
        <button class="find_btn" @click="sendTempPw()">전송</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    const state = reactive({
      form: {
        email: "",
        password: "",
      },
      modalState: 0, // 1: pw찾기 모달창 open,
      naverClientId: "UWRvT59b1Pv1JV8c8_T4",
      naverCallbackUrl: "http://localhost:8080",
      naverstates: Math.random().toString(36).slice(2, 11),
      emailForPw: "",
    });

    // 네이버 로그인을 위한 url 이동
    const naverLogin = () => {
      const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${state.naverClientId}&redirect_uri=${state.naverCallbackUrl}&state=${state.naverstates}`;

      console.log("==================url====================");

      window.location.href = url;
    };

    //일반로그인
    const submit = async () => {
      await axios
        .post(`/api/members/login`, state.form)
        .then((res) => {
          console.log(res);
          window.alert("로그인 되었습니다.");

          //vuex에 로그인 결과값(isLogin, ATK, RTK값) 저장
          store.commit("login");

          axios.post(`/api/members/admincheck`).then(() => {
            store.commit("isAdmin");
          });

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

    //리프레쉬토큰 체크시 사용
    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshdata = await axios
            .post("/api/members/refreshcheck", {
              accessToken: Cookies.get("accessToken"), //VUEX에 저장된 값을 불러들이는 것으로 변경 필요
              grantType: "Bearer",
              refreshToken: Cookies.get("refreshToken"), //VUEX에 저장된 값을 불러들이는 것으로 변경 필요
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
              accessToken: Cookies.get("accessToken"), //VUEX에 저장된 값을 불러들이는 것으로 변경 필요
              grantType: "Bearer",
              refreshToken: Cookies.get("refreshToken"), //VUEX에 저장된 값을 불러들이는 것으로 변경 필요
            });
            Cookies.set("accessToken", data.accessToken); //VUEX에 저장된 값을 불러들이는 것으로 변경 필요
            originalRequest.headers.Authorization =
              "Bearer" + " " + Cookies.get("accessToken"); //VUEX에 저장된 값을 불러들이는 것으로 변경 필요
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

    //비밀번호 찾기(임시 비밀번호 전송)
    const sendTempPw = async () => {
      await axios
        .get(`/api/mail/checkemail?userEmail=${state.emailForPw}`)
        .then((res) => {
          if (res.data.check == true) {
            axios
              .get(`/api/mail/sendemailpw?userEmail=${state.emailForPw}`)
              .then(() => {
                alert("임시 비밀번호를 전송했습니다.");
              })
              .catch((err) => {
                console.log(err);
                alert("메일 전송을 실패했습니다.");
              });
          }
          if (res.data.check == false) {
            alert("가입된 이메일이 아닙니다.");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("오류가 발생했습니다. 관리자에게 문의하세요.");
        });
    };

    return {
      state,
      submit,
      naverLogin,
      sendTempPw,
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
#findIdPw {
  cursor: pointer;
  color: #928c8c;
  margin-left: 350px;
  margin-top: 10px;
  font-size: 17px;
}
.FindIdPwModal {
  width: 600px;
  height: 300px;
  border: 1px solid black;
  position: absolute;
  left: 58%;
  top: 55%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}

.FindIdPwBtn {
  width: 527px;
  height: 80px;
  border-radius: 6px;
  font-size: 27px;
  cursor: pointer;
  color: #fff;
  background-color: #3ddca3;
  border: none;
  margin-top: 50px;
}

.close_btn {
  font-size: 35px;
  color: #5f5d5d;
  margin-left: 530px;
  margin-top: 8px;
  cursor: pointer;
}

.input {
  height: 39px;
  outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
  -webkit-appearance: none; /* 브라우저별 기본 스타일링 제거 */
  -moz-appearance: none;
  appearance: none;
  border: 0.5px solid #c0c0c0;
  border-radius: 6px;
  padding-left: 10px;
  box-sizing: content-box;
  width: 500px;
  margin-bottom: 5px;
  font-size: 20px;
}

.find_btn {
  width: 114px;
  height: 40px;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
  color: #fff;
  background-color: #3ddca3;
  border: none;
  margin-top: 10px;
  margin-right: 400px;
}
.findpw_title {
  font-size: 23px;
  margin-bottom: 10px;
}
</style>
