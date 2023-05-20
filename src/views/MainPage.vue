<template>
  <div id="total_wrap">
    <div id="center_wrap">
      <div class="headerpage"></div>
      <header>
        <div id="bottom_nav_wrap">
          <ul>
            <li>
              <label>•</label>
              <a href="*"> 베스트셀러</a>
            </li>
            <li>
              <label>•</label>
              <a href="*"> 이 주의 신간</a>
            </li>
            <li>
              <label>•</label>
              <a href="*"> 에디터's PICK</a>
            </li>
            <li>
              <label>•</label>
              <a href="*"> 이벤트</a>
            </li>
          </ul>
        </div>
        <div id="slider_wrap">
          <!-- <el-carousel height="407px">
            <el-carousel-item>
              <img src="../assets/MainPage/slide1.png" alt="slide1" />
            </el-carousel-item>
            <el-carousel-item>
              <img src="../assets/MainPage/slide2.png" alt="slide2" />
            </el-carousel-item>
            <el-carousel-item>
              <img src="../assets/MainPage/slide3.png" alt="slide3" />
            </el-carousel-item>
          </el-carousel> -->
        </div>
        <div id="notice_wrap">
          <div>공지사항</div>
          <div>MintBook 서버 검점 안내(4/17)</div>
        </div>
      </header>
      <section>
        <div class="content_wrap">
          <div class="content_top">
            <ul class="content_left">
              <li>
                <img src="../assets/MainPage/bestseller.png" alt="bestseller" />
              </li>
              <li class="content_text">베스트셀러</li>
            </ul>
            <div class="content_right">
              <label>더보기+</label>
            </div>
          </div>
          <div class="content_bottom">
            <div
              class="content_book_wrap"
              v-for="(data, idx) in state.bestsellerrow"
              :key="idx"
            >
              <p class="c_ranking">01.</p>
              <img
                src="../assets/MainPage/book3.jpg"
                alt="book1"
                class="c_image"
                @click="godetail(data.id)"
              />
              <p class="c_title">{{ data.bookName }}</p>
              <p class="c_author">{{ data.author }}</p>
            </div>
          </div>
        </div>
        <div class="ad_wrap">
          <img src="../assets/MainPage/ad1.jpg" alt="ad1" />
        </div>
        <div class="content_wrap">
          <div class="content_top">
            <ul class="content_left">
              <li>
                <img src="../assets/MainPage/new.png" alt="new" id="new_img" />
              </li>
              <li class="content_text">이 주의 신간</li>
            </ul>
            <div class="content_right">
              <label>더보기+</label>
            </div>
          </div>
          <div class="content_bottom">
            <div class="content_book_wrap">
              <img
                src="../assets/MainPage/book1.jpg"
                alt="book1"
                class="c_image"
              />
              <p class="c_title">세이노의 가르침</p>
              <p class="c_author">세이원·데이원</p>
            </div>
            <div class="content_book_wrap">
              <img
                src="../assets/MainPage/book2.jpg"
                alt="book2"
                class="c_image"
              />
              <p class="c_title">세이노의 가르침</p>
              <p class="c_author">세이원·데이원</p>
            </div>
            <div class="content_book_wrap">
              <img
                src="../assets/MainPage/book3.jpg"
                alt="book3"
                class="c_image"
              />
              <p class="c_title">세이노의 가르침</p>
              <p class="c_author">세이원·데이원</p>
            </div>
            <div class="content_book_wrap">
              <img
                src="../assets/MainPage/book4.jpg"
                alt="book4"
                class="c_image"
              />
              <p class="c_title">세이노의 가르침</p>
              <p class="c_author">세이원·데이원</p>
            </div>
            <div class="content_book_wrap">
              <img
                src="../assets/MainPage/book5.jpg"
                alt="book5"
                class="c_image"
              />
              <p class="c_title">세이노의 가르침</p>
              <p class="c_author">세이원·데이원</p>
            </div>
          </div>
        </div>
        <div class="ad_wrap">
          <img src="../assets/MainPage/ad2.jpg" alt="ad2" />
        </div>
        <div class="content_wrap">
          <div class="content_top">
            <ul class="content_left">
              <li>
                <img
                  src="../assets/MainPage/editorspick.png"
                  alt="new"
                  id="new_img"
                />
              </li>
              <li class="content_text">에디터's PICK</li>
            </ul>
            <div class="content_right">
              <label>더보기+</label>
            </div>
          </div>
          <div class="content_bottom">
            <div class="content_book_wrap">
              <img
                src="../assets/MainPage/book1.jpg"
                alt="book1"
                class="c_image"
              />
              <p class="c_title">세이노의 가르침</p>
              <p class="c_author">세이원·데이원</p>
            </div>
            <div class="content_book_wrap">
              <img
                src="../assets/MainPage/book2.jpg"
                alt="book2"
                class="c_image"
              />
              <p class="c_title">세이노의 가르침</p>
              <p class="c_author">세이원·데이원</p>
            </div>
            <div class="content_book_wrap">
              <img
                src="../assets/MainPage/book3.jpg"
                alt="book3"
                class="c_image"
              />
              <p class="c_title">세이노의 가르침</p>
              <p class="c_author">세이원·데이원</p>
            </div>
            <div class="content_book_wrap">
              <img
                src="../assets/MainPage/book4.jpg"
                alt="book4"
                class="c_image"
              />
              <p class="c_title">세이노의 가르침</p>
              <p class="c_author">세이원·데이원</p>
            </div>
            <div class="content_book_wrap">
              <img
                src="../assets/MainPage/book5.jpg"
                alt="book5"
                class="c_image"
              />
              <p class="c_title">세이노의 가르침</p>
              <p class="c_author">세이원·데이원</p>
            </div>
          </div>
        </div>
        <div>
          <el-backtop :right="70" :bottom="70" style="color: #3ddca3" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import Cookies from "js-cookie";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const state = reactive({
      naverClientId: "UWRvT59b1Pv1JV8c8_T4",
      naverclientSecret: "L3bZiXKHGq",
      navercode: route.query.code, //네이버 로그인 인증에 성공하면 반환받는 인증 코드, 접근 토큰(access token) 발급에 사용
      naverstates: route.query.state, //사이트 간 요청 위조 공격을 방지하기 위해 애플리케이션에서 생성한 상태 토큰으로 URL 인코딩을 적용한 값
      naver_access_token: "",
      naver_refresh_token: "",
      snsProfile: "",
      name: "",
      snsId: "",
      gender: "",
      birth: "",
      email: "",
      snsType: "",
      page: 0,
      size: 10,
      bestsellerrow: [],
    });

    //상세페이지 이동
    const godetail = (id) => {
      router.push({ path: "/book", query: { id: id } });
    };

    //책 리스트 수신
    // const getBookAll = async () => {
    //   await axios
    //     .get(`/api/bestsellerbookall?page=${state.page}&size=${state.size}`)
    //     .then((res) => {
    //       console.log("베스트셀러 목록", res);
    //       state.bestsellerrow = res.data.content;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };

    // NAVER 콜백 받는 로직
    // const naverCallback = async () => {
    //   if (route.query.code !== undefined) {
    //     console.log("route.query.code => ", route.query.code); //파라미터로 전달받은 code값
    //     console.log("route.query.states => ", route.query.state); //파라미터로 전달받은 state값

    //     //grant_type : 인증 과정에 대한 구분값 1) 발급:'authorization_code' 2) 갱신:'refresh_token' 3) 삭제: 'delete'
    //     const url = `/oauth2.0/token?grant_type=authorization_code&client_id=${state.naverClientId}&client_secret=${state.naverclientSecret}&code=${state.navercode}&state=${state.naverstates}`;
    //     const headers = {
    //       "X-Naver-Client-Id": state.naverClientId,
    //       "X-Naver-Client-Secret": state.naverclientSecret,
    //     };
    //     const { data } = await axios.get(url, { headers });

    //     console.log("data => ", data);

    //     console.log("data.access_token => ", data.access_token);
    //     Cookies.set("naver_access_token", data.access_token);

    //     console.log("data.refresh_token => ", data.refresh_token);
    //     Cookies.set("naver_refresh_token", data.refresh_token);

    //     naverUserInfo();
    //   }
    // };

    //네이버 로그인 access토큰 만료시 intercept용
    // const naverapi = axios.create({
    //   baseURL: "/",
    // });

    // NAVER 사용자 정보 전달받기
    // const naverUserInfo = async () => {
    //   const url = `/v1/nid/me`; //프로필 정보 조회URL
    //   let header = "Bearer " + Cookies.get("naver_access_token");
    //   const headers = { Authorization: header };
    //   console.log("headers => ", headers);
    //   const { data } = await naverapi.get(url, { headers });
    //   console.log("*****naverUserInfo data***** => ", data);

    //   const date = new Date();

    //   // 변수에 값 넣기(연동 회원가입에 사용)
    //   state.email = data.response.email;
    //   state.birth = date.getFullYear() + "-" + data.response.birthday; //05-23형식이므로 연도를 더해서 JAVA DateTime포맷을 맞춘다.
    //   state.gender = data.response.gender;
    //   state.snsId = data.response.id; //네이버에서 발급해주는 고유한 id값(기 연동된 유저인지 판별에 사용)
    //   state.name = data.response.name;
    //   state.snsProfile = data.response.profile_image;
    //   state.snsType = "Naver";

    //   naverSnsIdCheck(state.snsId);
    // };

    //네이버 access_Token만료시(401오류) refresh토큰으로 access토큰을 재발급
    // naverapi.interceptors.response.use(
    //   (response) => response,
    //   async (error) => {
    //     const originalRequest = error.config;

    //     //401에러거나 재시도한적이 없을 때
    //     if (error.response.status === 401 && !originalRequest._retry) {
    //       originalRequest._retry = true;

    //       //리프레쉬토큰 재발급 요청
    //       const naverrefreshtoken = Cookies.get("naver_refresh_token");

    //       await axios
    //         .post(
    //           `/oauth2.0/token?grant_type=refresh_token&client_id=${state.naverClientId}&client_secret=${state.naverclientSecret}&refresh_token=${naverrefreshtoken}`
    //         )
    //         .then((res) => {
    //           //재발급 받은 access토큰을 다시 저장 후
    //           state.naver_access_token = res.data.access_token;
    //           //중단됐던 로직 재실행
    //           naverUserInfo();
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //           window.alert(
    //             "네이버access토큰 재발급에 실패했습니다. 다시 로그인해주세요."
    //           );
    //           router.push({ path: "/login" });
    //           return Promise.reject(error);
    //         });
    //     }
    //     return Promise.reject(error);
    //   }
    // );

    //NAVER SNS 연동여부 확인
    // const naverSnsIdCheck = async (snsId) => {
    //   await axios
    //     .post(`/api/members/snscheck`, { snsId: snsId })
    //     .then((res) => {
    //       //조회 결과 sns연동계정이 있으면 로그인
    //       if (res.data === true) {
    //         axios
    //           .post(`/api/members/snslogin`, { snsId: snsId })
    //           .then((res) => {
    //             console.log(res);
    //             window.alert("로그인 하셨습니다.");

    //             //vuex에 로그인 결과값 저장
    //             store.commit("login");
    //           })
    //           .catch((err) => {
    //             console.log(err);
    //             window.alert("로그인에 실패하셨습니다.");
    //           });
    //       } else {
    //         // 없으면 회원가입
    //         if (confirm("자동 회원가입 후 로그인하시겠습니까?")) {
    //           axios
    //             .post(`/api/members/snsjoin`, {
    //               email: state.email,
    //               birth: state.birth,
    //               gender: state.gender,
    //               snsId: state.snsId,
    //               name: state.name,
    //               snsProfile: state.snsProfile,
    //               snsType: state.snsType,
    //             })
    //             .then((res) => {
    //               console.log(res);
    //               window.alert("회원가입 후 로그인에 성공하셨습니다.");

    //               //vuex에 로그인 결과값 저장
    //               store.commit("login");
    //             })
    //             .catch((err) => {
    //               console.log(err);
    //               window.alert("회원가입 후 로그인에 실패하셨습니다.");
    //               router.push({ path: "/login" });
    //             });
    //         } else {
    //           return false;
    //         }
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };

    onMounted(() => {
      // naverCallback();
      // getBookAll(); //베스트셀러 수신
    });

    return {
      state,
      godetail,
    };
  },
};
</script>

<style lang="css" scoped>
/*초기화 */
* {
  padding: 0;
  margin: 0;
}

ul,
li {
  list-style: none;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  color: black;
  font-weight: bold;
}

/*HeaderPage용 공백 */
.headerpage {
  height: 95px;
}
/* header영역 */

#center_wrap {
  width: 1200px;
  margin: 0 auto;
}

#bottom_nav_wrap {
  height: 93px;
  border-bottom: 0.5px solid #e0dddd;
}

#bottom_nav_wrap > ul {
  padding-top: 50px;
}

#bottom_nav_wrap > ul > li {
  float: left;
  margin-right: 45px;
}

#bottom_nav_wrap > ul > li > a {
  font-size: 15px;
  font-weight: bold;
  color: rgb(75, 75, 75);
}

#bottom_nav_wrap > ul > li > label {
  color: #3ddca3;
}

/* 슬라이드 영역 */
#slider_wrap {
  padding-top: 10px;
}

/* 공지사항 영역 */
#notice_wrap {
  height: 47px;
  display: grid;
  grid-template-columns: 150px auto;
  line-height: 47px;
  color: grey;
  font-size: 13px;
  margin-top: 20px;
  border-bottom: 0.5px solid #e0dddd;
}
#notice_wrap > div:first-child {
  text-align: center;
}

/* 베스트셀러 영역 */
.content_wrap {
  /* height: 970px; */
  margin-top: 50px;
}

.content_top {
  height: 34px;
  line-height: 34px;
}

.content_left > li {
  float: left;
  margin-right: 10px;
}

.content_text {
  font-size: 24px;
  font-weight: bold;
}

.content_left > li > img {
  height: 34px;
}

.content_right > label {
  float: right;
  font-size: 16px;
  font-weight: light;
}

.content_bottom {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  margin-top: 40px;
}

.content_book_wrap {
  margin-bottom: 20px;
}

.c_ranking {
  font-size: 36px;
  font-weight: bolder;
  color: #3ddca3;
}

.c_image {
  width: 210px;
  border: 0.5px solid #c6c4c4;
  cursor: pointer;
}

.c_title {
  font-size: 15px;
}

.c_author {
  font-size: 13px;
  color: #998f8f;
}

/* 광고 영역 */
.ad_wrap {
  margin-top: 80px;
  margin-bottom: 80px;
}
.ad_wrap > img {
  border-radius: 25px;
}
</style>
