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
          <li><a href="/mypage/myreviewlist" id="current">리뷰내역</a></li>
          <li><a href="/mypage/alimi">알리미</a></li>
          <li><a href="/mypage/myinfoedit">회원정보수정</a></li>
        </ul>
      </div>
    </div>

    <div class="right_content" v-if="state.pageState === 1">
      <h4>리뷰상세</h4>
      <table class="table">
        <tbody>
          <tr>
            <th scope="row">별점</th>
            <td colspan="3" style="text-align: left"></td>
          </tr>
          <tr>
            <th scope="row">내용</th>
            <td colspan="3">
              <textarea
                cols="30"
                rows="10"
                class="input"
                placeholder="내용을 입력하세요."
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="register_wrap">
        <button @click="noticeRevise()">수정</button>
        <button @click="cancel()">취소</button>
      </div>
    </div>

    <div class="right_content" v-if="state.pageState === 2">
      <h4>리뷰수정</h4>
      <table class="table">
        <tbody>
          <tr>
            <th scope="row">별점</th>
            <td colspan="3" style="text-align: left">
              <select v-model="state.reviseStar">
                <option value="5.0">5점</option>
                <option value="4.0">4점</option>
                <option value="3.0">3점</option>
                <option value="2.0">2점</option>
                <option value="1.0">1점</option>
              </select>
            </td>
          </tr>
          <tr>
            <th scope="row">내용</th>
            <td colspan="3">
              <textarea
                cols="30"
                rows="10"
                class="input"
                placeholder="내용을 입력하세요."
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="register_wrap">
        <button @click="noticeRevise()">수정</button>
        <button @click="cancel()">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import axios from "axios";
export default {
  setup() {
    const state = reactive({
      reviewlist: [],
      pageState: 1,
      reviseStar: 0,
    });

    onMounted(() => {});

    return {
      state,
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
  height: 550px;
  overflow: hidden;
  margin-top: 60px;
  display: flex;
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
.right_content {
  width: 1000px;
  height: 200px;
}
#current {
  font-weight: bold;
}
.table {
  width: 100%;
  margin-top: 50px;
  margin-bottom: 30px;
  text-align: center;
  line-height: 35px;
}
thead {
  background: #f5f5f5;
  border-bottom: 1px solid #dddcdc;
  border-top: 1px solid #dddcdc;
  height: 46px;
  line-height: 45px;
}
.btn {
  border: 1px solid #b8b6b6;
  margin-left: 5px;
  border-radius: 10px;
  width: 69px;
}
.td {
  padding: 2px;
}
.input {
  width: 80%;
  border-radius: 5px;
  border: 0.5px solid rgb(184, 184, 184);
  padding-left: 10px;
}
</style>
