<template>
  <div id="total_wrap">
    <div class="center_wrap">
      <div class="headerpage"></div>
      <ul class="maintitle_wrap">
        <li><img src="../assets/EventPage/event.png" alt="" /></li>
        <li id="maintitle">이벤트</li>
      </ul>
      <div id="categorylist">
        <div id="eventimg">
          <a href=""><img src="../assets/EventPage/event1.jpg" alt="" /></a>
        </div>
        <div id="eventimg">
          <a href=""><img src="../assets/EventPage/event2.jpg" alt="" /></a>
        </div>
        <div id="eventimg">
          <a href=""><img src="../assets/EventPage/event3.jpg" alt="" /></a>
        </div>
        <div id="eventimg">
          <a href=""><img src="../assets/EventPage/event4.jpg" alt="" /></a>
        </div>
      </div>
      <div>
        <el-backtop :right="70" :bottom="70" style="color: #3ddca3" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
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
  margin-top: 40px;
  margin-bottom: 50px;
  padding-bottom: 100px;
  border-bottom: 0.5px solid #b3b3b3;
}
.maintitle_wrap > li {
  float: left;
}

.maintitle_wrap > li > img {
  width: 35px;
  margin-right: 10px;
}

#maintitle {
  font-size: 24px;
  font-weight: bold;
}

/*카테고리 리스트 영역 */
#categorylist {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
}

#eventimg {
  width: 380px;
  height: 206px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  margin: 0 auto;
  margin-bottom: 30px;
}
</style>
