<template>
  <div id="join_wrap">
    <div id="join_con">
      <h3 style="margin: 50px">회원가입</h3>

      <div id="guide_email">{{ state.guideEmail }}</div>
      <div style="margin-left: 86px">
        <label for="id" class="lbl">이메일</label>
        <input
          type="text"
          class="input"
          ref="email"
          v-model="state.email"
          placeholder="이메일"
        />
        <span id="Xcheck" @click="emailCheck()">중복확인</span>
      </div>
      <div>
        <label for="pw" class="lbl">비밀번호</label>
        <input
          type="password"
          class="input"
          ref="password"
          v-model="state.password"
          placeholder="비밀번호"
        />
      </div>

      <div>
        <label for="pwcheck" class="lbl">비밀번호 확인</label>
        <input
          type="password"
          class="input"
          ref="pwcheck"
          v-model="state.pwcheck"
          placeholder="비밀번호 확인"
        />
      </div>

      <div>
        <label for="name" class="lbl">이름</label>
        <input
          type="text"
          class="input"
          ref="name"
          v-model="state.name"
          placeholder="이름"
        />
      </div>

      <div>
        <label for="birth" class="lbl">생년월일</label>
        <input
          type="date"
          class="input"
          ref="birth"
          v-model="state.birth"
          style="color: #706e6e"
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

      <div class="field">
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

      <div>
        <button class="join_btn" @click="join()">회원가입</button>
        <router-link to="/login"
          ><button class="cancel_btn">취소</button></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    const state = reactive({
      postcode: "", //우편번호
      address: "", //주소
      detailaddress: "", //상세주소
      email: "",
      password: "", //비밀번호
      pwcheck: "", //비밀번호 확인
      name: "",
      birth: "",
      gender: "",
      phone: "",
      guideEmail: "",
    });

    const email = ref();
    const password = ref();
    const pwcheck = ref();
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

    //회원가입
    const join = async () => {
      if (state.email === "") {
        alert("이메일을 입력하세요.");
        email.value.focus();
        return false;
      }
      if (state.password === "") {
        alert("패스워드를 입력하세요.");
        password.value.focus();
        return false;
      }
      if (state.pwcheck === "") {
        alert("패스워드 확인을 입력하세요.");
        pwcheck.value.focus();
        return false;
      }
      if (state.name === "") {
        alert("이름을 입력하세요.");
        name.value.focus();
        return false;
      }
      if (state.birth === "") {
        alert("생일을 입력하세요.");
        birth.value.focus();
        return false;
      }
      if (state.postcode === "") {
        alert("주소를 입력하세요.");
        birth.value.focus();
        return false;
      }
      if (state.detailaddress === "") {
        alert("상세주소를 입력하세요.");
        detailaddress.value.focus();
        return false;
      }
      if (state.gender === "") {
        alert("성별을 선택하세요.");
        return false;
      }
      if (state.phone === "") {
        alert("전화번호를 입력하세요.");
        phone.value.focus();
        return false;
      }
      if (isNaN(state.phone)) {
        alert("숫자만 입력해주세요.");
        state.phone = "";
        phone.value.focus();
        return false;
      }
      if (state.password !== state.pwcheck) {
        alert("패스워드가 일치하지 않습니다.");
        pwcheck.value.focus();
        return false;
      }
      await axios
        .post(`/api/members/join`, {
          email: state.email,
          address: state.address,
          addDetail: state.detailaddress,
          password: state.password,
          pwcheck: state.pwcheck,
          name: state.name,
          birth: state.birth,
          gender: state.gender,
          phone:
            state.phone.slice(0, 3) +
            "-" +
            state.phone.slice(3, 7) +
            "-" +
            state.phone.slice(7, 11),
        })
        .then((res) => {
          console.log(res);
          window.alert("회원가입 되었습니다.");
          store.commit("login");
          router.push({ path: "/" });
        })
        .catch((err) => {
          console.log(err);
          alert("잘못된 회원가입 요청입니다.");
        });
    };

    //이메일 중복체크
    const emailCheck = async () => {
      if (state.email === "") {
        alert("이메일을 입력하세요.");
        email.value.focus();
        return false;
      }

      await axios
        .get(`/api/members/emailcheck?email=${state.email}`)
        .then((res) => {
          if (res.data === 0) {
            if (state.email.includes("@") === false) {
              state.guideEmail = "올바른 메일 형식이 아닙니다.";
              return false;
            }
            state.guideEmail = "사용가능한 메일입니다.";
          } else if (res.data >= 1) {
            state.guideEmail = "이미 사용중인 메일입니다.";
          }
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
    });

    return {
      state,
      sample6_execDaumPostcode,
      join,
      email,
      password,
      pwcheck,
      name,
      birth,
      phone,
      postcode,
      detailaddress,
      emailCheck,
    };
  },
};
</script>

<style lang="css" scoped>
#join_wrap {
  margin: 0 auto;
  overflow: hidden;
}

#join_con {
  text-align: center;
  overflow: hidden;
  margin-top: 100px;
}

.lbl {
  width: 150px;
  text-align: left;
  font-size: 18px;
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

.join_btn {
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

#Xcheck {
  border: 1px solid #cccccc;
  cursor: pointer;
  border-radius: 5px;
  padding: 7px;
  /* padding */
  padding-top: 9px;
  color: #868484;
  font-size: 18px;
}

#guide_email {
  color: red;
  height: 39px;
  color: transparent;
  text-shadow: 0 0 0 red;
  margin-right: 200px;
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
</style>
