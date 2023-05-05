<template>
  <div id="total_wrap">
    <div id="divide_wrap">
      <div id="nav_wrap">
        <admin-menu-page></admin-menu-page>
      </div>
      <div id="content_wrap">
        <p id="maintitle">도서관리</p>
        <label>
          <select v-model="state.keyword">
            <option value="bookName" :selected="state.keyword === 'bookName'">
              도서명
            </option>
            <option value="author">저자명</option>
            <option value="isbn">ISBN</option>
            <option value="publisher">출판사</option>
          </select>
        </label>
        <label>
          <input
            type="text"
            v-model="state.content"
            @keyup.enter="bookSearch()"
          />
        </label>
        <button id="search" @click="bookSearch()">검색</button>
        <router-link to="/admin/book/register"
          ><button id="register">도서등록</button></router-link
        >
        <table class="table">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">ISBN</th>
              <th scope="col">도서명</th>
              <th scope="col">저자명</th>
              <th scope="col">출판사</th>
              <th scope="col">출판일</th>
              <th scope="col">재고수</th>
              <th scope="col">정가</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, idx) of state.bookdata" :key="idx">
              <td>{{ data.id }}</td>
              <td>{{ data.isbn }}</td>
              <td @click="bookdetail(data.id)" style="cursor: pointer">
                {{ data.bookName }}
              </td>
              <td>{{ data.author }}</td>
              <td>{{ data.publisher }}</td>
              <td>{{ data.publishDate }}</td>
              <td>{{ data.stock }}</td>
              <td>{{ data.price }}</td>
            </tr>
          </tbody>
        </table>
        <div id="pagination">
          <el-pagination
            layout="prev, pager, next"
            @current-change="handlePage"
            :total="state.total"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import AdminMenuPage from "../../components/AdminMenuPage.vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  components: {
    AdminMenuPage,
  },

  setup() {
    const router = useRouter();

    const state = reactive({
      page: 0,
      size: 10,
      bookdata: [],
      total: 0,
      keyword: "bookName",
      content: "",
    });

    //도서목록 수신
    const getBookAll = async () => {
      await axios
        .get(`/api/bookall?page=${state.page}&size=${state.size}`)
        .then((res) => {
          console.log("도서전체목록", res);
          state.bookdata = res.data.content;
          state.total = res.data.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    //도서검색
    const bookSearch = async () => {
      await axios
        .get(
          `/api/book/search?page=${state.page}&size=${state.size}&keyword=${state.keyword}&content=${state.content}`
        )
        .then((res) => {
          console.log("검색결과", res);
          state.bookdata = res.data.content;
        })
        .catch((err) => {
          console.log(err);
          alert("검색오류 발생");
        });
    };

    //도서상세 이동
    const bookdetail = (id) => {
      router.push({ path: "/admin/book/detail", query: { id: id } });
    };

    //페이지 이동
    const handlePage = (page) => {
      state.page = page - 1;
      getBookAll();
    };

    onMounted(() => {
      getBookAll();
    });

    return {
      state,
      handlePage,
      bookSearch,
      bookdetail,
    };
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
