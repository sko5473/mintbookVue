<template>
  <div id="total_wrap">
    <div class="center_wrap">
      <div class="headerpage"></div>
      <ul class="maintitle_wrap">
        <li><img src="../assets/OrderPage/order.png" alt="" /></li>
        <li id="maintitle">주문/결제</li>
      </ul>
      <div class="orderproduct_section">
        <p class="section_title">주문상품</p>
        <table class="table">
          <tr v-for="(data, idx) in state.preBuyInfo" :key="idx">
            <td id="orderlist_left">
              <p>{{ data.bookName }}</p>
              <p class="orderlist_author">{{ data.author }}</p>
            </td>
            <td id="orderlist_center">{{ data.buyCount }}</td>
            <td id="orderlist_right">{{ data.price }}원</td>
          </tr>
        </table>
      </div>
      <div class="address_section">
        <p class="section_title">베송지 정보</p>
        <table class="table">
          <tr>
            <td class="address_table_left">주문자명</td>
            <td class="address_table_right">홍길동</td>
          </tr>
          <tr>
            <td class="address_table_left">수령자명</td>
            <td class="address_table_right">
              <input type="text" v-model="state.oneMemberInfo.name" />
            </td>
          </tr>
          <tr>
            <td class="address_table_left">전화번호</td>
            <td class="address_table_right">
              <input type="text" v-model="state.oneMemberInfo.phone" />
            </td>
          </tr>
          <tr>
            <td class="address_table_left">휴대전화</td>
            <td class="address_table_right">
              <input type="text" v-model="state.oneMemberInfo.phone" />
            </td>
          </tr>
          <tr>
            <td class="address_table_left">주소</td>
            <input type="text" id="sample6_postcode" v-model="state.postcode" placeholder="우편번호"
              class="address_table_right" />
            <input type="button" @click="sample6_execDaumPostcode()" value="우편번호 찾기" class="addresssearch_btn"
              style="margin-left:10px;" /><br />
          </tr>
          <tr>
            <td class="address_table_left"></td>
            <input type="text" id="sample6_address" v-model="state.address" placeholder="주소" class="address_table_right"
              style="margin-top:10px;" /><br />
          </tr>
          <tr>
            <td class="address_table_left"></td>
            <input type="text" id="sample6_detailAddress" v-model="state.detailaddress" placeholder="상세주소"
              class="address_table_right" style="margin-top:10px;" />
          </tr>
        </table>
      </div>
      <div class="dc_section">
        <p class="section_title">캐시/포인트</p>
        <table class="table" id="cashtable">
          <tr>
            <td class="dc_dt1">포인트</td>
            <td class="dc_dt2">{{ state.oneMemberInfo.point }}원</td>
            <td class="dc_dt3">
              <input type="text" v-model="state.applyPoint" />
            </td>
            <td class="dc_dt4">
              <button class="dc_btn" @click="applyPoint()">포인트적용</button>
            </td>
            <td class="dc_dt5">사용가능한포인트: {{ state.oneMemberInfo.point }} Point</td>
          </tr>
        </table>
      </div>
      <div class="payment_section">
        <p class="section_title">결제수단</p>
        <table class="table">
          <tr>
            <td id="payment_td">
              <input type="radio" v-model="state.paymentmethod" value="creditcard" name="method" id="pay1"
                class="radiobtn" />
              <label for="pay1">신용카드</label>
              <input type="radio" v-model="state.paymentmethod" value="deposit" name="method" id="pay2"
                class="radiobtn" />
              <label for="pay2">무통장입금</label>
            </td>
          </tr>
        </table>
      </div>
      <div class="totalprice_section">
        <p class="section_title">최종 결제 금액</p>
        <div id="payinfo_wrap">
          <div class="paybox">
            <div>
              <label class="label1">상품 주문 총액</label>
              <label>{{ state.totalOrderPrice }}원</label>
            </div>
            <div>
              <label class="label1">배송비</label>
              <label>0원</label>
            </div>
          </div>
          <div class="calc">-</div>
          <div class="paybox">
            <div>
              <label class="label1">포인트 적용</label>
              <label>{{ state.applyPoint }}원</label>
            </div>
            <div>
              <label class="label1">캐시 적용</label>
              <label>0원</label>
            </div>
          </div>
          <div class="calc">=</div>
          <div id="finalbox">
            <p class="finaltext">최종 결제 금액</p>
            <p class="finalprice">{{ state.finalPrice }}원</p>
            <button id="borderbtn">주문하기</button>
          </div>
        </div>
        <p id="agreetext">구매조건을 확인하였으며 결제에 동의합니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, reactive } from "vue";

export default {
  setup() {
    const state = reactive({
      paymentmethod: "",
      preBuyInfo: [], //결제미리보기 정보
      oneMemberInfo: "", //회원 정보
      applyPoint: 0, //사용포인트
      preUsePoint: 0, //사용 전 포인트
      totalOrderPrice: 0, //상품 주문 총액
      finalPrice: 0, //최종 결제 금액
    });

    //포인트 적용
    const applyPoint = () => {
      //사용 전 포인트보다 현재포인트가 더 작다면
      if (state.preUsePoint > state.oneMemberInfo.point) {
        //사용 전 포인트로 포인트 갱신
        state.oneMemberInfo.point = state.preUsePoint;
      }
      //포인트 차감 적용
      state.oneMemberInfo.point = state.oneMemberInfo.point - state.applyPoint;
      //포인트 적용 후 결제 금액 갱신
      calTotalPrice(1);
    }

    //상품 주문 총액, 최종 결제 금액 계산
    const calTotalPrice = (info) => {
      //포인트 적용 후 결제 금액 갱신일때만
      if (info === 1) {
        //최종결제 금액 계산
        state.finalPrice = state.totalOrderPrice - state.applyPoint;
      } else {
        //상품주문총액
        for (var i = 0; i < state.preBuyInfo.length; i++) {
          //상품가격 X 상품수량을 상품 수만큼 계속 더해준다.
          state.totalOrderPrice = state.totalOrderPrice + (state.preBuyInfo[i].price * state.preBuyInfo[i].buyCount);
        }
        state.finalPrice = state.totalOrderPrice;
      }
    }

    //결제관련 책정보 1개 수신
    const getPreBuyInfo = () => {
      state.preBuyInfo = JSON.parse(sessionStorage.getItem('preBuyInfo'));
    }

    //멤버정보 수신
    const getOneMemberInfo = async () => {
      await axios.get(`/api/members/one`).then((res) => {
        console.log(res);
        state.oneMemberInfo = res.data;
        state.preUsePoint = res.data.point;
      }).catch((err) => {
        console.log(err);
      })
    }

    onMounted(() => {
      getPreBuyInfo(); //결제관련 책정보 1개 수신
      getOneMemberInfo(); //1명 멤버 정보 수신
      calTotalPrice(); //상품 주문 총액, 최종 결제 금액 계산
    });

    return {
      state,
      applyPoint, //포인트 적용
      calTotalPrice, //상품 주문 총액, 최종 결제 금액 계산
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

/*1200px 중앙정렬 */
.center_wrap {
  width: 1200px;
  margin: 0 auto;
}

/*HeaderPage용 공백 */
.headerpage {
  height: 95px;
}

/*페이지 타이틀 영역 */
.maintitle_wrap {
  height: 30px;
  margin-top: 40px;
  margin-bottom: 50px;
}

.maintitle_wrap>li {
  float: left;
}

.maintitle_wrap>li>img {
  width: 35px;
  margin-right: 10px;
}

#maintitle {
  font-size: 24px;
  font-weight: bold;
}

/*주문상품 영역*/

.orderproduct_section {
  padding-bottom: 50px;
  border-bottom: 1px solid #cccccc;
}

.section_title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 30px;
}

.table {
  width: 100%;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 30px;
  padding-bottom: 30px;
  box-sizing: border-box;
  border: 1px solid #3ddca3;
  border-radius: 33px;
  font-size: 14px;
  border-spacing: 0px;
  border-collapse: separate;
}

#orderlist_left,
#orderlist_center,
#orderlist_right {
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #cccccc;
}

#orderlist_center {
  width: 150px;
}

#orderlist_right {
  width: 200px;
}

.orderlist_author {
  color: #919191;
}

/*배송지정보 영역*/
.address_section {
  margin-top: 50px;
  padding-bottom: 50px;
  border-bottom: 1px solid #cccccc;
}

.address_table_left {
  font-weight: bold;
  width: 100px;
  vertical-align: top;
}

input[type="text"] {
  height: 39px;
  outline-style: none;
  /* 포커스시 발생하는 효과 제거를 원한다면 */
  -webkit-appearance: none;
  /* 브라우저별 기본 스타일링 제거 */
  -moz-appearance: none;
  appearance: none;
  border: 0.5px solid #c0c0c0;
  border-radius: 6px;
  padding-left: 10px;
  width: 500px;
}

#input_address1 {
  width: 500px;
  margin-right: 10px;
  margin-bottom: 10px;
}

#input_address2 {
  width: 500px;
}

.addresssearch_btn {
  width: 130px;
  height: 39px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  border: 0.5px solid #7c7c7c;
  color: #7c7c7c;
}

/* 캐시/포인트 영역 */
.dc_section {
  margin-top: 50px;
  padding-bottom: 50px;
  border-bottom: 1px solid #cccccc;
}

#cashtable {
  vertical-align: middle;
}

.dc_dt1 {
  font-weight: bold;
  width: 100px;
  border-bottom-width: 0px;
}

.dc_dt2 {
  font-weight: bold;
  width: 120px;
  text-align: right;
  padding-right: 20px;
  border-bottom-width: 0px;
}

.dc_dt3 {
  width: 320px;
  border-bottom-width: 0px;
}

.dc_dt3>input {
  width: 300px;
}

.dc_dt4 {
  text-align: left;
  width: 180px;
  border-bottom-width: 0px;
}

.dc_dt5 {
  text-align: left;
  border-bottom-width: 0px;
}

.dc_btn {
  width: 130px;
  height: 39px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  border: 0.5px solid #3ddca3;
  color: white;
  background: #3ddca3;
}

/*결제수단 영역*/
.payment_section {
  margin-top: 50px;
  padding-bottom: 50px;
  border-bottom: 1px solid #cccccc;
}

#payment_td {
  padding-top: 10px;
  padding-bottom: 10px;
}

/* .paymethod_btn:hover{
        border: 0.5px solid #3DDCA3;
        background: #3DDCA3;
        color: white;
    } */

input[type="radio"] {
  display: none;
}

input[type="radio"]+label {
  padding: 15px 40px;
  border-radius: 6px;
  border: 0.5px solid #c0c0c0;
  margin-right: 20px;
}

input[type="radio"]:checked+label {
  background: #3ddca3;
  border: 0.5px solid #3ddca3;
  color: white;
}

/* 최종 결제 금액 영역 */
.totalprice_section {
  margin-top: 50px;
}

#payinfo_wrap {
  display: grid;
  grid-template-columns: 300px auto 300px auto 300px;
}

.paybox {
  width: 300px;
  height: 219px;
  border: 1px solid #3ddca3;
  border-radius: 33px;
  padding: 40px;
  box-sizing: border-box;
}

.calc {
  height: 219px;
  line-height: 169px;
  font-size: 100px;
  text-align: center;
}

.label1 {
  margin-top: 30px;
  width: 110px;
  margin-right: 20px;
  font-weight: bold;
  display: inline-block;
}

#finalbox {
  text-align: center;
  width: 300px;
  height: 219px;
  padding-top: 70px;
  border: 1px solid #3ddca3;
  border-radius: 33px;
  box-sizing: border-box;
}

.finaltext {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.finalprice {
  font-size: 20px;
  font-weight: bold;
  color: #3ddca3;
  margin-bottom: 10px;
}

#borderbtn {
  width: 300px;
  height: 51px;
  margin-top: 23px;
  border-bottom-left-radius: 33px;
  border-bottom-right-radius: 33px;
  font-size: 12px;
  cursor: pointer;
  border: 0.5px solid #3ddca3;
  background: #3ddca3;
  color: white;
}

#borderbtn:hover {
  font-weight: bolder;
}

#agreetext {
  margin-left: 910px;
  margin-top: 20px;
  font-size: 14px;
  color: #939393;
}

#orderlist_left>p {
  padding: 0;
}

.address_table_right,
.address_table_left {
  padding: 10px 0;
}</style>
