<template>
  <div class="total_wrap">
    <div class="center_wrap">
      <div class="headerpage"></div>
      <div id="divide_section">
        <div id="category">
          <p id="category_title">고객센터</p>
          <ul>
            <li><a href="/cs/register" id="bold">1:1문의접수</a></li>
            <li><a href="/faq">자주 묻는 질문</a></li>
            <li><a href="/notice">공지사항</a></li>
          </ul>
        </div>
        <div id="section">
          <p id="maintitle">1:1문의접수</p>
          <table>
            <tr>
              <td>제목</td>
              <td>
                <input type="text" placeholder="제목을 입력해주세요." />
              </td>
            </tr>
            <tr>
              <td>내용</td>
              <td>
                <textarea
                  name=""
                  id=""
                  placeholder="문의하실 내용을 입력해주세요."
                ></textarea>
              </td>
            </tr>
          </table>
          <div id="btn_wrap">
            <button>등록</button>
            <button><a href="/cs">취소</a></button>
          </div>
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

a:hover {
  text-decoration: none;
  color: black;
  font-weight: bold;
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
  margin-bottom: 50px;
}

/*사이드 카테고리 영역*/
#divide_section {
  display: grid;
  grid-template-columns: 247px auto;
}

#category {
  padding-top: 50px;
}

#category_title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 25px;
}

#category > ul > li {
  font-size: 15px;
  margin-bottom: 10px;
}

#category > ul > li > a:hover {
  color: black;
  font-weight: bold;
}

#bold {
  font-weight: bold;
}

/*무엇을 도와드릴까요 영역 */
#section {
  font-weight: bold;
  padding-top: 50px;
}

td {
  width: 367px;
  vertical-align: top;
  padding-bottom: 20px;
}

input {
  width: 100%;
  height: 39px;
  border: 1px solid #c0c0c0;
  border-radius: 6px;
  padding-left: 20px;
  outline: none;
}

textarea {
  border: 1px solid #c0c0c0;
  border-radius: 10px;
  width: 833px;
  height: 206px;
  resize: none;
  outline: none;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
}

#btn_wrap {
  width: 100%;
  text-align: center;
}

button {
  width: 114px;
  height: 37px;
  border-radius: 10px;
  border: 0.5px solid #9b9b9b;
  margin-left: 10px;
  cursor: pointer;
}
button:hover {
  font-weight: bold;
}
</style>
