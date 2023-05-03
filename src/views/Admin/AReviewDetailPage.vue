<template>
  <div id="total_wrap">
    <div id="divide_wrap">
      <div id="nav_wrap">
        <admin-menu-page></admin-menu-page>
      </div>
      <div id="content_wrap">
        <p id="maintitle">리뷰 상세</p>
        <table class="table">
          <tbody>
            <tr>
              <th scope="row">리뷰번호</th>
              <td>{{ state.detailrow.reviewid }}</td>
            </tr>
            <br />
            <tr>
              <th scope="row">작성자</th>
              <td>{{ state.detailrow.writer }}</td>
              <th scope="row">작성날짜</th>
              <td>{{ state.detailrow.regDate }}</td>
            </tr>
            <tr>
              <th scope="row">도서명</th>
              <td>{{ state.detailrow.bookName }}</td>
              <th scope="row">ISBN</th>
              <td>{{ state.detailrow.isbn }}</td>
            </tr>
            <tr>
              <th scope="row">내용</th>
              <td colspan="3">{{ state.detailrow.content }}</td>
            </tr>
          </tbody>
        </table>
        <div id="register_wrap">
          <button @click="reviewDelete()">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import AdminMenuPage from "../../components/AdminMenuPage.vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    AdminMenuPage,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      reviewid: route.query.id,
      detailrow: [],
      regDate: "",
    });

    //게시글 상세데이터 수신
    const reviewdetail = async () => {
      await axios
        .get(`/api/reviewone?id=${state.reviewid}`)
        .then((res) => {
          console.log("상세", res);
          state.detailrow = res.data;
          state.regDate = res.data.regDate.slice(0, 10);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    //리뷰 삭제
    const reviewDelete = () => {
      axios
        .delete(`/api/review/${state.reviewid}`)
        .then(() => {
          alert("삭제되었습니다.");
          router.push({
            path: "/admin/review",
          });
        })
        .catch((err) => {
          console.log(err);
          alert("삭제시 오류가발생하였습니다.");
        });
    };

    onMounted(() => {
      reviewdetail();
    });

    return { state, reviewDelete };
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

/*전체 페이지 영역 */
#divide_wrap {
  /* width: 1920px; */
  display: grid;
  grid-template-columns: 290px auto;
}

#content_wrap {
  padding-left: 30px;
  padding-right: 30px;
}

/*사이드메뉴 영역 */
#nav_wrap {
  background: rgb(223, 223, 223);
  height: 100vh;
}

/*콘텐츠 상단 영역 */
#maintitle {
  font-size: 24px;
  font-weight: bold;
  margin-top: 50px;
  margin-bottom: 50px;
}

button {
  width: 100px;
  border-radius: 5px;
  color: white;
  background: black;
  margin-bottom: 30px;
  margin-left: 10px;
}

#edit {
  margin-left: 50px;
  float: right;
}

/*콘텐츠 하단 영역 */

.table {
  width: 100%;
  margin-top: 30px;
}

th {
  width: 200px;
  background: rgb(184, 184, 184);
}

#register_wrap {
  display: flex;
  justify-content: center;
}
</style>
