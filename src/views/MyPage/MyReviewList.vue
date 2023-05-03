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
          <li><a href="/mypage/choice">찜</a></li>
          <li><a href="/mypage/cashpoint">캐시/포인트</a></li>
          <li><a href="/mypage/inquire">1:1 문의내역</a></li>
          <li><a href="/mypage/myreviewlist" id="current">리뷰내역</a></li>
          <li><a href="/mypage/alimi">알리미</a></li>
          <li><a href="/mypage/myinfoedit">회원정보수정</a></li>
        </ul>
      </div>
    </div>
    <div class="right_content">
      <h4>리뷰내역</h4>
      <table class="table">
        <thead>
          <th width="50%">도서명</th>
          <th width="25%">작성일</th>
          <th width="25%">비고</th>
        </thead>
        <tbody>
          <tr v-for="(data, idx) in state.reviewlist" :key="idx">
            <td class="td">{{ data.bookName }}</td>
            <td class="td">{{ data.regDate.slice(0, 10) }}</td>
            <td class="td">
              <button class="btn" @click="goDetail(data.reviewid)">수정</button>
              <button class="btn" @click="deleteMyReview(data.reviewid)">
                삭제
              </button>
            </td>
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
</template>

<script>
import { onMounted, reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();

    const state = reactive({
      reviewlist: [],
      page: 0,
      size: 10,
      reviewTotal: 0,
    });

    //페이지 이동
    const handlePage = (page) => {
      state.page = page - 1;
      myReviewList();
    };

    //내 리뷰리스트
    const myReviewList = async () => {
      await axios
        .get(`/api/myreviewall?page=${state.page}&size=${state.size}`)
        .then((res) => {
          console.log("내 리뷰리스트", res);
          state.reviewlist = res.data.content;
          state.reviewTotal = res.data.totalElements;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    //나의리뷰 삭제
    const deleteMyReview = (reviewid) => {
      axios
        .delete(`/api/review/${reviewid}`)
        .then(() => {
          alert("삭제되었습니다.");
          myReviewList();
        })
        .catch((err) => {
          console.log(err);
          alert("삭제시 오류가발생하였습니다.");
        });
    };

    //나의리뷰 상세페이지 이동
    const goDetail = (id) => {
      router.push({ path: "/mypage/review/detail", query: { id: id } });
    };

    onMounted(() => {
      myReviewList();
    });

    return {
      state,
      goDetail,
      handlePage,
      deleteMyReview,
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
  height: 650px;
  overflow: hidden;
  margin-top: 60px;
  display: flex;
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
.right_content {
  width: 1000px;
  height: 200px;
}
#current {
  font-weight: bold;
}
.table {
  width: 100%;
  margin-top: 50px;
  margin-bottom: 30px;
  text-align: center;
  line-height: 35px;
}
thead {
  background: #f5f5f5;
  border-bottom: 1px solid #dddcdc;
  border-top: 1px solid #dddcdc;
  height: 46px;
  line-height: 45px;
}
.btn {
  border: 1px solid #b8b6b6;
  margin-left: 5px;
  border-radius: 10px;
  width: 69px;
}
.td {
  padding: 2px;
}
.input {
  width: 80%;
  border-radius: 5px;
  border: 0.5px solid rgb(184, 184, 184);
  padding-left: 10px;
}
#pagination {
  margin-left: 400px;
}
</style>
