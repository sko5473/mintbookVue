<template>
  <div id="total_wrap">
    <div id="center_wrap">
      <ul id="nav_left_wrap">
        <li id="menu_button_wrap">
          <img
            src="../assets/Navigation/Menu.png"
            id="menubutton"
            alt="menuButton"
            @click="setModal()"
          />
        </li>
        <li id="logo_wrap">
          <a href="/"
            ><img src="../assets/Navigation/logo.png" id="logo" alt="logo"
          /></a>
        </li>
        <li>
          <div id="search_wrap">
            <input
              type="text"
              v-model="state.searchtext"
              placeholder="2023 부커상 후보! 천명관 <고래>"
            />
            <img src="../assets/Navigation/search.png" alt="search" />
          </div>
        </li>
      </ul>
      <ul id="nav_right_wrap">
        <li>
          <a href="/mypage/mypage"
            ><img
              src="../assets/Navigation/profile.png"
              id="profile"
              alt="profile"
          /></a>
        </li>
        <li>
          <a href="/cart"
            ><img src="../assets/Navigation/cart.png" id="cart" alt="cart"
          /></a>
        </li>
        <li v-if="state.isAdmin == 'ADMIN' && state.isLogin == true">
          <!-- <li v-if="$store.state.isAdmin == 'ADMIN'"> -->
          <a href="/admin/book">관리자페이지</a>
        </li>
        <li><a href="/cs">고객센터</a></li>
        <li><a href="/join">회원가입</a></li>
        <li><a href="/login" v-if="state.isLogin === false">로그인</a></li>
        <el-button @click="flogin" v-if="!$store.state.flogin">페이스북 로그인</el-button>
        <el-button @click="flogout" v-if="$store.state.flogin">페이스북 로그아웃</el-button>
        {{ $store.state.flogin }}
        <li
          v-if="state.isLogin === true"
          @click="logout()"
          style="cursor: pointer"
        >
          로그아웃
        </li>
      </ul>
    </div>
    <div id="modal_wrap" v-if="state.modalOpen === true">
      <div id="modal_title">
        <p>도서 카테고리</p>
      </div>
      <div id="modal_content_wrap">
        <ul class="categorylist">
          <li>소설</li>
          <li>시/에세이</li>
          <li>인문</li>
          <li>가정/육아</li>
          <li>요리</li>
          <li>건강</li>
        </ul>
        <ul class="categorylist">
          <li>취미/실용/스포츠</li>
          <li>경제/경영</li>
          <li>자기계발</li>
          <li>정치/사회</li>
          <li>역사/문화</li>
          <li>종교</li>
        </ul>
        <ul class="categorylist">
          <li>예술/대중문화</li>
          <li>중/고등참고서</li>
          <li>기술/공학</li>
          <li>외국어</li>
          <li>과학</li>
          <li>취업/수험서</li>
        </ul>
        <ul class="categorylist">
          <li>여행</li>
          <li>컴퓨터/IT</li>
          <li>잡지</li>
          <li>청소년</li>
        </ul>
        <ul class="categorylist" id="menulist">
          <li>베스트셀러</li>
          <li>이 주의 신간</li>
          <li>에디터's PICK</li>
          <li>이벤트</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";

export default {
  setup() {
    const state = reactive({
      searchtext: "",
      modalOpen: false,
      isLogin: "",
      isAdmin: "",
      access: "",
      fuserid: "",
    });

    const store = useStore();
    const router = useRouter();

    state.isLogin = computed(() => store.state.isLogin);

    state.isAdmin = computed(() => store.state.isAdmin);

    const setModal = () => {
      state.modalOpen = !state.modalOpen;
    };

    //로그아웃
    const logout = async () => {
      await axios
        .post(`/api/members/logout`)
        .then((res) => {
          console.log(res);
          store.commit("logout");

          Cookies.remove("naver_access_token");
          Cookies.remove("naver_refresh_token");

          alert("로그아웃 되었습니다.");
          router.push({ path: "/login" });
        })
        .catch((err) => {
          console.log(err);
          alert("로그아웃을 실패했습니다.");
        });
    };

    //페이스북 로그인
    const flogin = () => {
      window.FB.login((res)=>{
        console.log('로그인성공',res);
        if(res.authResponse !==null){
        store.commit("flogin");
        }
      })
    }

    const flogout = () => {
      window.FB.logout((res)=>{
        console.log('로그아웃 성공',res);
        if(res.authResponse ==null){
          store.commit("flogout");
        }
      })
    }

    return {
      state,
      setModal,
      logout,
      flogin,
      flogout
    };
  },
};
</script>

<style lang="css" scoped>
/* 초기화 */
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
  text-decoration: none;
  color: black;
  font-weight: bold;
}

#total_wrap {
  width: 1920px;
  height: 95px;
  border-bottom: 0.5px solid #3ddca3;
  background: white;
  margin: 0 auto;
  position: relative;
  z-index: 3;
}

#center_wrap {
  width: 1200px;
  height: 95px;
  margin: 0 auto;
  position: relative;
}

#nav_left_wrap {
  /* width: 782px; */
  height: 50px;
  float: left;
  position: absolute;
  top: 50px;
  margin-top: -25px;
  /* background-color: rgb(161, 154, 154); */
}

#nav_left_wrap > li {
  float: left;
}

#menu_button_wrap {
  margin-right: 45px;
}

#menubutton {
  width: 38px;
  margin-top: 6px;
  cursor: pointer;
}

#logo_wrap {
  margin-right: 10px;
}

#logo {
  width: 168px;
  height: 50px;
}

#search_wrap {
  border: 1.5px solid #3ddca3;
  width: 500px;
  height: 45px;
  border-radius: 22.5px;
  position: relative;
  margin-top: 1.5px;
}

#search_wrap > input {
  background-color: transparent;
  border: none;
  color: rgb(0, 0, 0);
  caret-color: #3ddca3;
  font-size: 14px;
  width: 90%;
  height: 45px;
  margin-left: 30px;
  -webkit-appearance: none; /* 브라우저별 기본 스타일링 제거 */
  -moz-appearance: none;
  appearance: none;
}

#search_wrap > input:focus {
  outline: none;
  width: 90%;
}

#search_wrap > input::placeholder {
  color: rgb(174, 173, 173);
}

#search_wrap > img {
  width: 21px;
  height: 21px;
  float: right;
  right: 10px;
  position: absolute;
  top: 50%;
  margin-top: -10.5px;
}

#nav_right_wrap {
  /* width: 315px; */
  height: 35px;
  float: right;
  line-height: 35px;
  position: absolute;
  top: 50%;
  margin-top: -17.5px;
  right: 0px;
}
#nav_right_wrap > li {
  float: right;
  font-size: 13px;
  margin-left: 17px;
}

#cart,
#profile {
  width: 35px;
  height: 35px;
}

/*모달영역 */
#modal_wrap {
  width: 1200px;
  border: 1.5px solid black;
  border-radius: 25px;
  padding: 50px;
  box-sizing: border-box;
  margin: 0 auto;
  background: white;
}

#modal_title {
  height: 50px;
  border-bottom: 1.5px solid #3ddca3;
  margin: 0 auto;
  font-weight: bold;
  font-size: 18px;
}

#modal_content_wrap {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  margin-top: 40px;
  margin-bottom: 30px;
}

.categorylist > li {
  margin-top: 10px;
  font-size: 15px;
}

#menulist > li {
  color: #3ddca3;
}
</style>
