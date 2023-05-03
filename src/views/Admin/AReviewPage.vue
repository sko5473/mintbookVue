<template>
  <div id="total_wrap">
    <div id="divide_wrap">
      <div id="nav_wrap">
        <admin-menu-page></admin-menu-page>
      </div>
      <div id="content_wrap">
        <p id="maintitle">리뷰관리</p>
        <select v-model="state.searchTitle">
          <option value="writer" :selected="state.searchTitle === 'writer'">
            작성자
          </option>
          <option value="bookName">도서</option>
        </select>
        <label>
          <input
            type="text"
            v-model="state.searchContent"
            @keyup.enter="ReviewSearch()"
          />
        </label>
        <button id="search" @click="ReviewSearch()">검색</button>
        <table class="table">
          <thead>
            <tr>
              <th scope="col" width="10%">No.</th>
              <th scope="col" width="30%">도서명</th>
              <th scope="col" width="20%">ISBN</th>
              <th scope="col" width="20%">작성자</th>
              <th scope="col" width="20%">작성날짜</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, idx) in state.reviewlist" :key="idx">
              <td>{{ data.reviewid }}</td>
              <td @click="reviewDetail(data.reviewid)" style="cursor: pointer">
                {{ data.bookName }}
              </td>
              <td>{{ data.isbn }}</td>
              <td>{{ data.writer }}</td>
              <td>{{ data.regDate.slice(0, 10) }}</td>
            </tr>
          </tbody>
        </table>
        <div id="pagination">
          <el-pagination
            layout="prev, pager, next"
            :total="state.reviewTotal"
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
      reviewlist: [],
      page: 0,
      size: 10,
      searchTitle: "writer",
      searchContent: "",
      reviewTotal: 0,
    });

    //리뷰 목록
    const reviewList = async () => {
      await axios
        .get(`/api/reviewall?page=${state.page}&size=${state.size}`)
        .then((res) => {
          console.log("리스트", res.data);
          state.reviewlist = res.data.content;
          state.reviewTotal = res.data.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    //페이지 이동
    const handlePage = (page) => {
      state.page = page - 1;
      reviewList();
    };

    //리뷰 상세보기 이동
    const reviewDetail = (id) => {
      router.push({ path: `/admin/review/detail`, query: { id: id } });
    };

    //관리자 도서 검색
    const ReviewSearch = async () => {
      await axios
        .get(
          `/api/review/search?title=${state.searchTitle}&subject=${state.searchContent}&page=${state.page}&size=${state.size}`
        )
        .then((res) => {
          console.log("검색결과", res);
          state.reviewlist = res.data.content;
          state.reviewTotal = res.data.totalElements;
        })
        .catch((err) => {
          console.log(err);
          alert("검색에 실패했습니다.");
        });
    };

    onMounted(() => {
      reviewList();
    });

    return {
      state,
      ReviewSearch,
      reviewDetail,
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
