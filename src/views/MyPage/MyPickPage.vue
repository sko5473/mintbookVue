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
          <li><a href="/mypage/mypick" id="current">찜</a></li>
          <li><a href="/mypage/cashpoint">캐시/포인트</a></li>
          <li><a href="/mypage/inquire">1:1 문의내역</a></li>
          <li><a href="/mypage/review/list">리뷰내역</a></li>
          <li><a href="/mypage/alimi">알리미</a></li>
          <li><a href="/mypage/myinfoedit">회원정보수정</a></li>
        </ul>
      </div>
    </div>
    <div id="right_content">
      <h4>찜 목록</h4>
      <ul class="likemenu">
        <li>
          <input
            type="checkbox"
            class="checkbox"
            v-model="state.selectAll"
            style="margin-right: 5px"
            @change="checkAllBooks"
          />
          <span> 전체선택</span>
        </li>
        <li class="top_btn">
          <button class="total_btn" @click="addwishlisttocart()">
            장바구니
          </button>
        </li>
        <li><button class="total_btn">바로구매</button></li>
      </ul>
      <ul class="likecontent" v-for="(data, idx) in state.likerow" :key="idx">
        <li style="line-height: 125px">
          <input
            type="checkbox"
            class="checkbox"
            v-model="state.checkbookid"
            :value="data.bookId"
          />
        </li>
        <li style="margin-left: 50px">
          <img
            src="../../assets/MainPage/book4.jpg"
            alt="likeimg"
            style="
              width: 86px;
              height: 127px;
              object-fit: cover;
              margin-bottom: 30px;
            "
          />
        </li>
        <li style="margin-left: 70px">
          <p style="margin-top: 30px; font-weight: bold">{{ data.bookName }}</p>
          <p>{{ data.author }}, {{ data.publishDate }}</p>
        </li>
        <li style="position: absolute; left: 610px; top: 50px">
          {{ data.price }}원 | 360p
        </li>
        <li style="position: absolute; left: 810px; top: 20px">
          <button class="cart_btn" @click="addwishlisttocartone(data.bookId)">
            장바구니</button
          ><br />
          <button class="buy_btn" style="margin-top: 10px">바로구매</button>
        </li>
      </ul>
      <div id="pagination" style="margin-top: 250px; margin-left: 450px">
        <el-pagination
          layout="prev, pager, next"
          :total="state.total"
          @current-change="handlePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import axios from "axios";
export default {
  setup() {
    const state = reactive({
      page: 0,
      size: 10,
      likerow: [],
      total: 0,
      checkbookid: [],
      selectAll: false, //전체선택 체크박스 체크 유무
    });

    //페이지 이동
    const handlePage = (page) => {
      state.page = page - 1;
      allwishlist();
    };

    //여러개 장바구니 추가
    const addwishlisttocart = async () => {
      await axios
        .post(`/api/cart`, state.checkbookid)
        .then(() => {
          alert("저장되었습니다.");
        })
        .catch((err) => {
          console.log(err);
          alert("장바구니 추가 오류 발생");
        });
    };

    //한개 장바구니 추가
    const addwishlisttocartone = async (bookid) => {
      let arr = new Array();
      arr[0] = bookid;
      await axios
        .post(`/api/cart`, arr)
        .then(() => {
          alert("저장되었습니다.");
        })
        .catch((err) => {
          console.log(err);
          alert("장바구니 추가 오류 발생");
        });
    };

    //내 찜 목록
    const allwishlist = async () => {
      await axios
        .get(`/api/allwishlist?page=${state.page}&size=${state.size}`)
        .then((res) => {
          console.log("찜 목록", res.data.content);
          state.likerow = res.data.content;
          state.total = res.data.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    //전체선택 체크박스 컨트롤
    const checkAllBooks = () => {
      if (state.selectAll) {
        // 모든 도서 선택시 전체 booId를 담는다.
        state.checkbookid = state.likerow.map((book) => book.bookId);
      } else {
        // 모든 도서 선택 해제
        state.checkbookid = [];
      }
    };

    onMounted(() => {
      allwishlist();
    });

    return {
      state,
      handlePage,
      addwishlisttocart, //장바구니 여러개 추가
      addwishlisttocartone, // 장바구니 하나 추가
      checkAllBooks, //전체선택 체크박스 컨트롤
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
  height: 1650px;
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
  margin-left: 50px;
}
#current {
  font-weight: bold;
}
.likemenu {
  margin-top: 50px;
}
.likemenu > li {
  float: left;
}
.likecontent > li {
  float: left;
}
.likecontent {
  clear: both;
  margin-top: 100px;
  position: relative;
}
input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #3ddca3;
  height: 16px;
  outline: 0;
  width: 16px;
}
input[type="checkbox"]::after {
  border: 1px solid #3ddca3;
  border-width: 2px;
  content: "";
  display: none;
  height: 40%;
  left: 40%;
  position: relative;
  top: 20%;
  transform: rotate(45deg);
  width: 15%;
}
input[type="checkbox"]:checked {
  background: #3ddca3;
}
input[type="checkbox"]:checked::after {
  display: block;
}
button {
  width: 114px;
  height: 36px;
  border: none;
}
.buy_btn {
  background-color: #3ddca3;
  color: white;
  border-radius: 10px;
}
.cart_btn {
  border-radius: 10px;
}
.total_btn {
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid #b1b1b1;
  float: right;
}
.top_btn {
  margin-left: 560px;
  margin-right: 10px;
}
</style>
