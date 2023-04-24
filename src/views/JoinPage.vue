<template>
  <div id="join_wrap">
    <HeaderPage style="position: fixed; z-index: 300"></HeaderPage>
    <div id="join_con">
      <h3 style="margin: 50px">회원가입</h3>

      <div>
        <label for="id" class="lbl">이메일</label>
        <input
          type="text"
          class="input"
          v-model="state.email"
          placeholder="이메일"
        />
      </div>

      <div>
        <label for="pw" class="lbl">비밀번호</label>
        <input
          type="password"
          class="input"
          v-model="state.password"
          placeholder="비밀번호"
        />
      </div>

      <div>
        <label for="pwcheck" class="lbl">비밀번호 확인</label>
        <input
          type="password"
          class="input"
          v-model="state.pwcheck"
          placeholder="비밀번호 확인"
        />
      </div>

      <div>
        <label for="name" class="lbl">이름</label>
        <input
          type="text"
          class="input"
          v-model="state.name"
          placeholder="이름"
        />
      </div>

      <div>
        <label for="birth" class="lbl">생년월일</label>
        <input
          type="date"
          class="input"
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
        <label for="birth" class="lbl">휴대폰번호</label>
        <input
          type="text"
          class="input"
          v-model="state.phone"
          placeholder="휴대폰번호"
        />
      </div>

      <div class="field">
        <label for="address" class="lbl">주소</label>
        <input
          type="text"
          id="sample6_postcode"
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
    <FooterPage></FooterPage>
  </div>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import FooterPage from "@/components/FooterPage.vue";
import { onMounted, reactive } from "vue";
import axios from "axios";

export default {
  components: {
    HeaderPage: HeaderPage,
    FooterPage: FooterPage,
  },
  setup() {
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
    });

    const sample6_execDaumPostcode = () => {
      console.log("sample6_execDaumPostcode");
      new window.daum.Postcode({
        oncomplete: function (data) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 각 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var addr = ""; // 주소 변수
          //   var extraAddr = ""; // 참고항목 변수

          //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress;
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          //   if (data.userSelectedType === "R") {
          //     // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          //     // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          //     if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          //       extraAddr += data.bname;
          //     }
          //     // 건물명이 있고, 공동주택일 경우 추가한다.
          //     if (data.buildingName !== "" && data.apartment === "Y") {
          //       extraAddr +=
          //         extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
          //     }
          //     // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          //     if (extraAddr !== "") {
          //       extraAddr = " (" + extraAddr + ")";
          //     }
          //     // 조합된 참고항목을 해당 필드에 넣는다.
          //     document.getElementById("sample6_extraAddress").value = extraAddr;
          //   } else {
          //     document.getElementById("sample6_extraAddress").value = "";
          //   }

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
          phone: state.phone,
        })
        .then((res) => {
          console.log(res);
          window.alert("회원가입 되었습니다.");
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
</style>
