<template>
  <div id="total_wrap">
    <div id="divide_wrap">
      <div id="nav_wrap">
        <admin-menu-page></admin-menu-page>
      </div>
      <div id="content_wrap">
        <p id="maintitle">도서 수정</p>
        <table class="table">
          <tbody>
            <tr>
              <th scope="row">도서명</th>
              <td colspan="3">
                <input type="text" v-model="state.bookName" />
              </td>
            </tr>
            <tr>
              <th scope="row">저자명</th>
              <td>
                <input type="text" v-model="state.author" />
              </td>
              <th scope="row">출판사</th>
              <td>
                <input type="text" v-model="state.publisher" />
              </td>
            </tr>
            <tr>
              <th scope="row">출판일</th>
              <td>
                <input type="text" v-model="state.publishDate" />
              </td>
              <th scope="row">정가</th>
              <td>
                <input type="text" v-model="state.price" />
              </td>
            </tr>
            <tr>
              <th scope="row">ISBN</th>
              <td>
                <input type="text" v-model="state.isbn" />
              </td>
              <th scope="row">카테고리</th>
              <td>
                <input type="text" v-model="state.genre" />
              </td>
            </tr>
            <tr>
              <th scope="row">판매수</th>
              <td>13</td>
              <th scope="row">재고수</th>
              <td>5</td>
            </tr>
            <tr>
              <th scope="row">작가소개</th>
              <td colspan="3">
                <textarea v-model="state.authorInfo"></textarea>
              </td>
            </tr>
            <tr>
              <th scope="row">책소개</th>
              <td colspan="3">
                <textarea v-model="state.content"></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <div id="register_wrap">
          <button @click="bookRevise()">수정</button>
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
      bookName: "",
      author: "",
      publisher: "",
      publishDate: "",
      price: "",
      isbn: "",
      genre: "",
      authorInfo: "",
      content: "",
      id: route.query.id,
    });

    //도서 1개 데이터 수신
    const oneBookData = async () => {
      await axios
        .get(`/api/bookone?id=${state.id}`)
        .then((res) => {
          console.log("도서 1개 데이터", res);
          state.bookName = res.data.bookName;
          state.author = res.data.author;
          state.publisher = res.data.publisher;
          state.publishDate = res.data.publishDate;
          state.price = res.data.price;
          state.isbn = res.data.isbn;
          state.genre = res.data.genre;
          state.authorInfo = res.data.authorInfo;
          state.content = res.data.content;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    //1개 도서 수정
    const bookRevise = async () => {
      await axios
        .put(`/api/book/${state.id}`, {
          id: state.id,
          bookName: state.bookName,
          author: state.author,
          publisher: state.publisher,
          publishDate: state.publishDate,
          price: state.price,
          isbn: state.isbn,
          genre: state.genre,
          authorInfo: state.authorInfo,
          content: state.content,
        })
        .then(() => {
          alert("수정되었습니다.");
          router.push({ path: "/admin/book/detail", query: { id: state.id } });
        })
        .catch((err) => {
          console.log(err);
          alert("오류발생");
        });
    };

    //취소
    const cancel = () => {
      router.push({ path: "/admin/book/detail", query: { id: state.id } });
    };

    onMounted(() => {
      oneBookData();
    });

    return { state, cancel, bookRevise };
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

/*콘텐츠 하단 영역 */

.table {
  width: 100%;
  margin-top: 30px;
}

th {
  background: rgb(184, 184, 184);
}

input[type="text"] {
  width: 300px;
  border-radius: 5px;
  border: 0.5px solid rgb(184, 184, 184);
  padding-left: 10px;
}

textarea {
  width: 90%;
  border-radius: 5px;
  border: 0.5px solid rgb(184, 184, 184);
  padding-left: 10px;
}

#register_wrap {
  display: flex;
  justify-content: center;
}
</style>
