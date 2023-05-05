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
          <li><a href="/mypage/mypick">찜</a></li>
          <li><a href="/mypage/cashpoint" id="current">캐시/포인트</a></li>
          <li><a href="/mypage/inquire">1:1 문의내역</a></li>
          <li><a href="/mypage/review/list">리뷰내역</a></li>
          <li><a href="/mypage/alimi">알리미</a></li>
          <li><a href="/mypage/myinfoedit">회원정보수정</a></li>
        </ul>
      </div>
    </div>
    <div id="right_content">
      <h4>포인트</h4>
      <div id="point_box">
        <p style="font-size: 19px;">포인트</p>
        <div>
          <span style="color:#3DDCA3;font-weight: bold;font-size: 19px;">2000</span><span> Point</span>
        </div>
      </div>

      <ul class="point_searchbar">
        <li>포인트 내역</li>
        <li style="margin-left:490px;">
          <input type="number" :min="2000" :max="2030" placeholder="연도" v-model="state.selectYear"> 년 
        </li>
        <li style="margin-left:20px">
          <input type="number" :max="12" :min="1" placeholder="월" v-model="state.selectMonth"> 월
        </li>
        <li style="margin-left:30px;">
          <button class="pointsearch_btn">조회</button>
        </li>
      </ul>
      <table>
        <thead>
          <th>날짜</th>
          <th>구분</th>
          <th>금액</th>
        </thead>
        <tbody>
          <tr>
            <td>2023.03.31</td>
            <td>적립 or 사용</td>
            <td>140</td>
          </tr>
          <tr>
            <td>2023.03.31</td>
            <td>적립 or 사용</td>
            <td>140</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const state = reactive({
      selectYear: 2023,
      selectMonth: 1
    });

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
  margin-top: 60px;
  display: flex;
  height:500px;
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
  margin-left:30px;
}
#current {
  font-weight: bold;
}
#point_box{
  width:462px;
  height:168px;
  border-radius: 30px;
  border:1px solid #9B9B9B;
  text-align: center;
  margin-top:30px;
  padding:40px;
  margin-bottom:50px;
}
.pointsearch_btn{
  width:80px;
  height:23px;
  color:white;
  background-color: #3DDCA3;
  border-radius: 5px;
  border:none;
  margin-bottom:20px;
}
.point_searchbar > li{
  float:left;
}

input[type="number"]{
  width:84px;
  height:23px;
  border-radius: 5px;
  text-align: center;
  border: 1px solid #989898;
}

table {
  width: 949px;
  margin-top: 50px;
  margin-bottom: 30px;
  text-align: center;
}

thead {
  background: #f5f5f5;
  border-bottom: 1px solid #dddcdc;
  border-top: 1px solid #dddcdc;
  height: 46px;
}

tr{
  border-bottom:1px solid #dddcdc;
  height:46px;
}
</style>
