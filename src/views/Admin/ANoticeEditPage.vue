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
              <td colspan="3">
                <input
                  type="text"
                  class="input"
                  placeholder="제목을 입력하세요."
                  v-model="state.title"
                />
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
                  v-model="state.content"
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
      title: "",
      content: "",
    });

    //게시글 상세데이터 수신
    const noticedetail = async () => {
      await axios
        .get(`/api/notice/noticeone?id=${state.noticeid}`)
        .then((res) => {
          console.log(res);
          state.detailrow = res.data;
          state.regDate = res.data.regDate.slice(0, 10);
          state.title = res.data.title;
          state.content = res.data.content;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    //공지사항 수정
    const noticeRevise = async () => {
      await axios
        .put(`/api/notice/revise/${state.noticeid}`, {
          title: state.title,
          content: state.content,
        })
        .then(() => {
          alert("수정되었습니다.");
          router.push({
            path: "/admin/notice/detail",
            query: { id: state.noticeid },
          });
        })
        .catch((err) => {
          alert("수정을 실패하였습니다.");
          console.log(err);
        });
    };

    const cancel = () => {
      router.push({
        path: "/admin/notice/detail",
        query: { id: state.noticeid },
      });
    };

    onMounted(() => {
      noticedetail();
    });

    return { state, noticeRevise, cancel };
  },
};
</script>
import
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

.input {
  width: 80%;
  border-radius: 5px;
  border: 0.5px solid rgb(184, 184, 184);
  padding-left: 10px;
}
</style>
