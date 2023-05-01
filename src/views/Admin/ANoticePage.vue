<template>
  <div id="total_wrap">
    <div id="divide_wrap">
      <div id="nav_wrap">
        <admin-menu-page></admin-menu-page>
      </div>
      <div id="content_wrap">
        <p id="maintitle">공지관리</p>
        <label for="title">제목</label>
        <label>
          <input
            type="text"
            v-model="state.searchContent"
            @keyup.enter="BookSearch()"
          />
        </label>
        <button id="search" @click="BookSearch()">검색</button>
        <button id="register" @click="noticeWrite()">공지등록</button>
        <table class="table">
          <thead>
            <tr>
              <th scope="col" width="20%">No.</th>
              <th scope="col" width="60%">제목</th>
              <th scope="col" width="20%">작성날짜</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, idx) in state.noticelist" :key="idx">
              <td>{{ data.id }}</td>
              <td @click="noticeDetail(data.id)" style="cursor: pointer">
                {{ data.title }}
              </td>
              <td>{{ data.regDate.slice(0, 10) }}</td>
            </tr>
          </tbody>
        </table>
        <div id="pagination">
          <el-pagination
            layout="prev, pager, next"
            :total="state.total"
            @current-change="handlePage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import AdminMenuPage from "../../components/AdminMenuPage.vue";
import router from "@/router";
import axios from "axios";

export default {
  components: {
    AdminMenuPage,
  },

  setup() {
    const state = reactive({
      noticelist: [],
      total: "",
      page: 0,
      size: 10,
      searchContent: "",
    });

    //공지글 목록
    const noticeList = async () => {
      await axios
        .get(`/api/notice/noticelist?page=${state.page}&size=${state.size}`)
        .then((res) => {
          state.noticelist = res.data.content;
          state.total = res.data.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    //페이지 이동
    const handlePage = (page) => {
      state.page = page - 1;
      noticeList();
    };

    //공지 글쓰기 이동
    const noticeWrite = () => {
      router.push({ path: "/admin/notice/register" });
    };

    //공지사항 상세보기 이동
    const noticeDetail = (id) => {
      console.log("아이디", id);
      router.push({ path: `/admin/notice/detail`, query: { id: id } });
    };

    //관리자 도서 검색
    const BookSearch = async () => {
      await axios
        .get(`/api/notice/search?subject=${state.searchContent}`)
        .then((res) => {
          state.noticelist = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    onMounted(() => {
      noticeList();
    });

    return {
      state,
      BookSearch,
      noticeWrite,
      noticeDetail,
      handlePage,
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

/*콘텐츠 상단 영역 */
#maintitle {
  font-size: 24px;
  font-weight: bold;
  margin-top: 50px;
  margin-bottom: 70px;
}

button {
  width: 100px;
  border-radius: 5px;
  color: white;
  background: black;
}

select {
  width: 100px;
  height: 28px;
  margin-right: 20px;
}

input {
  margin-right: 10px;
}

#register {
  margin-left: 50px;
  float: right;
}

/*콘텐츠 하단 영역 */
#nav_wrap {
  background: rgb(223, 223, 223);
  height: 100vh;
}

.table {
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
}

#pagination {
  display: flex;
  justify-content: center;
}
</style>
