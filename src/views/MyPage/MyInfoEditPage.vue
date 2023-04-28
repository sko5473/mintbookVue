<template>
  <div id="mypage_wrap">
    <div id="left_bar">
      <div id="profile_area">
        <div id="profile_img">
          <img
            src="../../assets/MyPage/mypage_userprofile.png"
            alt="mypage_profile"
          />
        </div>
      </div>
      <div id="menu_area">
        <ul>
          <li><a href="/mypage/mypage">구매내역</a></li>
          <li><a href="/mypage/choice">찜</a></li>
          <li><a href="/mypage/cashpoint">캐시/포인트</a></li>
          <li><a href="/mypage/inquire">1:1 문의내역</a></li>
          <li><a href="/mypage/myreviewlist">리뷰내역</a></li>
          <li><a href="/mypage/alimi">알리미</a></li>
          <li><a href="/mypage/myinfoedit" id="current">회원정보수정</a></li>
        </ul>
      </div>
    </div>
    <div id="right_content" v-if="state.pageState === 1">
      <h4>회원정보 수정</h4>

      <div style="border-top: 1px solid black; padding-top: 30px">
        <label for="email" class="lbl">이메일</label>
        <span>{{ state.userInfo.email }}</span>
      </div>

      <div>
        <label for="password" class="lbl">패스워드</label>
        <button id="pwchange_btn" @click="state.pageState = 2">
          비밀번호 변경
        </button>
      </div>

      <div>
        <label for="name" class="lbl">이름</label>
        <input type="text" class="input" v-model="state.name" />
      </div>

      <div>
        <label for="birth" class="lbl">생년월일</label>
        <input
          type="date"
          v-model="state.birth"
          style="color: #706e6e"
          class="input"
        />
      </div>

      <div>
        <label for="gender" class="lbl">성별</label>
        <input
          type="radio"
          value="M"
          style="margin: 15px"
          v-model="state.gender"
        /><span style="margin: 20px 10px; font-size: 18px">남</span>
        <input
          type="radio"
          value="F"
          v-model="state.gender"
          style="margin-left: 30px"
        />
        <span style="margin-right: 440px; font-size: 18px; margin-left: 10px"
          >여</span
        >
      </div>

      <div>
        <label for="phone" class="lbl">휴대폰번호</label>
        <input
          type="text"
          class="input"
          ref="phone"
          :maxlength="11"
          v-model="state.phone"
          placeholder="휴대폰번호"
        />
      </div>

      <div
        class="field"
        style="border-bottom: 1px solid black; padding-bottom: 30px"
      >
        <label for="address" class="lbl">주소</label>
        <input
          type="text"
          id="sample6_postcode"
          ref="postcode"
          v-model="state.postcode"
          style="width: 281px; height: 39px"
          placeholder="우편번호"
          class="input"
        />
        <input
          type="button"
          @click="sample6_execDaumPostcode()"
          value="우편번호 찾기"
          style="
            width: 265px;
            height: 39px;
            border-radius: 15px;
            color: #7c7c7c;
            border: 1px solid #7c7c7c;
            margin-left: 30px;
          "
        /><br />

        <label for="address" class="lbl"></label>
        <input
          type="text"
          id="sample6_address"
          ref="address"
          v-model="state.address"
          placeholder="주소"
          class="input"
        /><br />

        <label for="address" class="lbl"></label>
        <input
          type="text"
          id="sample6_detailAddress"
          ref="detailaddress"
          v-model="state.detailaddress"
          placeholder="상세주소"
          class="input"
        />
      </div>
      <div id="btn_box">
        <button class="save_btn" @click="save()">저장</button>
        <router-link to="/memberrevise">
          <button class="cancel_btn">취소</button>
        </router-link>
      </div>
    </div>

    <!-- 패스워드 변경 페이지 시작 -->
    <div id="pwrevise_wrap" v-if="state.pageState === 2">
      <div style="margin-bottom: 60px"><h4>비밀번호 변경</h4></div>
      <div style="margin-bottom: 10px">
        <label for="oldpw" class="lbl">기존 비밀번호</label>
        <input
          type="password"
          class="input"
          ref="oldpw"
          v-model="state.oldpw"
          placeholder="기존 비밀번호를 입력하세요."
        />
      </div>
      <div id="newpwguide">{{ state.newpwguide }}</div>
      <div>
        <label for="newpw" class="lbl">새 비밀번호</label>
        <input
          type="password"
          class="input"
          ref="newpw"
          v-model="state.newpw"
          placeholder="새 비밀번호를 입력하세요."
        />
      </div>
      <div id="guidePassword">
        ● 영문, 숫자, 특수문자 3가지 조합 8자리 이상 또는 2가지 조합 10자리
        이상<br />
        ● 공백 및 3자 이상의 연속 또는 중복 문자는 사용 불가
      </div>
      <div>
        <label for="checknewpw" class="lbl">새 비밀번호 확인</label>
        <input
          type="password"
          class="input"
          ref="checknewpw"
          v-model="state.checknewpw"
          placeholder="새 비밀번호 확인을 입력하세요."
        />
      </div>

      <div id="btn_box">
        <button class="save_btn" @click="changePwSave()">저장</button>
        <router-link to="/memberrevise">
          <button class="cancel_btn">취소</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const state = reactive({
      postcode: "", //우편번호
      address: "", //주소
      detailaddress: "", //상세주소
      email: "",
      name: "",
      birth: "",
      gender: "",
      phone: "",
      userInfo: "",
      pageState: 1, // 1: 회원정보변경 화면, 2: 패스워드 변경 화면
      oldpw: "", //현재암호
      newpw: "", //변경 할 암호
      checknewpw: "", //변경 암호 확인
      newpwguide: "",
    });

    //유저정보 가져오기
    const getuserone = async () => {
      await axios
        .post(`/api/members/logincheck`)
        .then((res) => {
          console.log(res);
          state.userInfo = res.data;
          state.name = res.data.name;
          state.birth = res.data.birth;
          state.gender = res.data.gender;
          state.phone = res.data.phone.replaceAll("-", "");
          state.postcode = res.data.postcode;
          state.address = res.data.address;
          state.detailaddress = res.data.addDetail;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const email = ref();
    const oldpw = ref();
    const newpw = ref();
    const checknewpw = ref();
    const name = ref();
    const birth = ref();
    const phone = ref();
    const postcode = ref();
    const detailaddress = ref();

    const sample6_execDaumPostcode = () => {
      console.log("sample6_execDaumPostcode");
      new window.daum.Postcode({
        oncomplete: function (data) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 각 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var addr = ""; // 주소 변수

          //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress;
          }

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          document.getElementById("sample6_postcode").value = data.zonecode;
          state.postcode = data.zonecode;
          document.getElementById("sample6_address").value = addr;
          state.address = addr;
          // 커서를 상세주소 필드로 이동한다.
          document.getElementById("sample6_detailAddress").focus();
        },
      }).open();
    };

    //회원정보 수정
    const save = async () => {
      await axios
        .put(`/api/members/user`, {
          gender: state.gender,
          address: state.address,
          addDetail: state.detailaddress,
          age: state.age,
          name: state.name,
          phone: state.phone,
          birth: state.birth,
        })
        .then((res) => {
          console.log(res);
          alert("수정되었습니다.");
          router.push({ path: "/mypage/memberrevise" });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    //암호변경
    const changePwSave = async () => {
      if (state.oldpw === state.newpw) {
        state.newpwguide = "기존 암호와 동일한 암호입니다.";
        newpw.value.focus();
        state.newpw = "";
        return false;
      }
      if (state.newpw !== state.checknewpw) {
        state.newpwguide = "암호가 일치하지 않습니다.";
        state.checknewpw = "";
        checknewpw.value.focus();
        return false;
      }
      if (state.newpw === "") {
        state.newpwguide = "암호를 입력해주세요.";
        newpw.value.focus();
        return false;
      }
      await axios
        .put(`/api/members/userpw`, {
          prePassword: state.oldpw,
          changePassword: state.newpw,
        })
        .then(() => {
          alert("변경완료 되었습니다.");
          state.pageState = 1;
          state.newpwguide = "";
        })
        .catch((err) => {
          console.log(err);
        });
    };

    onMounted(() => {
      let script = document.createElement("script");
      script.src =
        "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      document.head.appendChild(script);
      console.log(window);
      getuserone();
    });

    return {
      state,
      sample6_execDaumPostcode,
      email,
      name,
      birth,
      phone,
      postcode,
      detailaddress,
      save,
      changePwSave,
      checknewpw,
      newpw,
      oldpw,
    };
  },
};
</script>

<style lang="css" scoped>
a {
  text-decoration: none;
  color: inherit;
}

#mypage_wrap {
  margin: 0 auto;
  width: 1200px;
  margin-top: 60px;
  display: flex;
  height: 500px;
}
#left_bar {
  width: 200px;
}
#profile_area {
  width: 176px;
  height: 146px;
  background-color: #3ddca3;
  border-radius: 15px;
  position: relative;
}
#profile_img {
  width: 70px;
  height: 70px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
#menu_area {
  width: 176px;
  height: 281px;
  border-radius: 20px;
  border: 3px solid #3ddca3;
  margin-top: 20px;
}
#menu_area > ul {
  width: 150px;
  margin-top: 20px;
}
#menu_area > ul > li {
  padding: 4px 0;
  font-size: 17px;
}
#right_content {
  width: 1000px;
  height: 200px;
  margin-left: 50px;
}
#current {
  font-weight: bold;
}
h4 {
  margin-bottom: 40px;
}
/* 생년월일 input박스 클릭시 달력 나오도록 start*/
input {
  position: relative;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  background-position: right;
  background-size: auto;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  width: auto;
}
/* 생년월일 input박스 클릭시 달력 나오도록 end*/

.save_btn {
  width: 114px;
  height: 37px;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
  color: #fff;
  background-color: #3ddca3;
  border: none;
  margin-top: 25px;
}

.cancel_btn {
  width: 114px;
  height: 37px;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
  color: #3ddca3;
  background-color: #fff;
  border: none;
  margin-top: 25px;
  border: 1px solid #3ddca3;
  margin-left: 10px;
}

.lbl {
  width: 150px;
  text-align: left;
  font-size: 18px;
  padding: 5px 0;
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
  width: 575px;
  margin-bottom: 5px;
  font-size: 20px;
}

#pwchange_btn {
  width: 114px;
  height: 32px;
  border-radius: 6px;
  font-size: 16px;
  color: rgb(77, 75, 75);
  background-color: #fff;
  border: 1px solid rgb(77, 75, 75);
}
#btn_box {
  margin-left: 300px;
}

#pwrevise_wrap {
  margin-left: 50px;
}

#guidePassword {
  color: #c0c0c0;
  margin-left: 150px;
  margin-bottom: 50px;
}
#newpwguide {
  color: red;
  margin-left: 170px;
  height: 37px;
}
</style>
