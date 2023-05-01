<template>
  <div id="total_wrap">
    <div id="divide_wrap">
      <div id="nav_wrap">
        <admin-menu-page></admin-menu-page>
      </div>
      <div id="content_wrap">
        <p id="maintitle">공지사항 상세</p>
        <table class="table">
          <tbody>
            <tr>
              <th scope="row">공지사항 번호</th>
              <td>{{ state.detailrow.id }}</td>
              <th scope="row">작성날짜</th>
              <td>{{ state.regDate }}</td>
            </tr>
            <tr>
              <th scope="row">제목</th>
              <td colspan="3">{{ state.detailrow.title }}</td>
            </tr>
            <tr>
              <th scope="row">내용</th>
              <td colspan="3">{{ state.detailrow.content }}</td>
            </tr>
          </tbody>
        </table>
        <div id="register_wrap">
          <button @click="goRevise()">수정</button>
          <button @click="noticeDelete()">삭제</button>
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
      noticeid: route.query.id,
      detailrow: [],
      regDate: "",
    });

    //게시글 상세데이터 수신
    const noticedetail = async () => {
      await axios
        .get(`/api/notice/noticeone?id=${state.noticeid}`)
        .then((res) => {
          console.log(res);
          state.detailrow = res.data;
          state.regDate = res.data.regDate.slice(0, 10);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    //공지사항 수정페이지 이동
    const goRevise = () => {
      router.push({
        path: "/admin/notice/edit",
        query: { id: state.detailrow.id },
      });
    };

    //공지사항 삭제
    const noticeDelete = () => {
      axios
        .delete(`/api/notice/delete/${state.noticeid}`)
        .then(() => {
          alert("삭제되었습니다.");
          router.push({
            path: "/admin/notice",
          });
        })
        .catch((err) => {
          console.log(err);
          alert("삭제시 오류가발생하였습니다.");
        });
    };

    onMounted(() => {
      noticedetail();
    });

    return { state, goRevise, noticeDelete };
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
