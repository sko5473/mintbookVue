<template>
  <div id="mypage_wrap">
    <div id="left_bar">
      <div id="profile_area">
        <div id="profile_img">
          <img src="../../assets/MyPage/mypage_userprofile.png" alt="mypage_profile" />
        </div>
      </div>
      <div id="menu_area">
        <ul>
          <li><a href="/mypage/mypage">구매내역</a></li>
          <li><a href="/mypage/mypick">찜</a></li>
          <li><a href="/mypage/cashpoint">캐시/포인트</a></li>
          <li><a href="/mypage/inquire">1:1 문의내역</a></li>
          <li><a href="/mypage/review/list">리뷰내역</a></li>
          <li><a href="/mypage/alimi" id="current">알리미</a></li>
          <li><a href="/mypage/myinfoedit">회원정보수정</a></li>
        </ul>
      </div>
    </div>
    <div id="right_content">
      <div>
        <h4>알리미 내역</h4>

        <ul class="alimi_menu">
          <li style="margin-left:700px;"><button @click="state.pageState = 1">등록</button></li>
          <li><button @click="alimiDelete()">삭제</button></li>
        </ul>

        <table>
          <thead>
            <th width="10%">전체선택<input type="checkbox" v-model="state.selectAll" @change="checkAllAlimis"></th>
            <th width="40%">도서명</th>
            <th>isbn</th>
            <th>알림 신청일</th>
            <th>알림유무</th>
          </thead>
          <tbody>
            <tr v-for="(data, idx) in state.myalimirow" :key="idx">
              <td><input type="checkbox" v-model="state.alimiId" :value="data.alimiId"></td>
              <td>{{ data.bookName }}</td>
              <td>{{ data.isbn }}</td>
              <td>{{ data.regDate.slice(0,10) }}</td>
              <td>{{ data.sendStatus }}</td>
            </tr>
          </tbody>
        </table>
        
        <div id="pagination" style="margin-left: 400px">
        <el-pagination
          layout="prev, pager, next"
          :total="state.alimitotal"
          @current-change="handlePage"
        />
      </div>
      </div>

      <!-- 알리미 등록 -->
      <div v-if="state.pageState === 1" id="alimi_reg_form">
        <div>
          <h4 style="margin-top:40px">알리미 등록</h4>
          <div @click="state.pageState = 0"
            style="font-size:30px;cursor: pointer;position:absolute; right:30px; top:20px;">X</div>
          <div>
            <input type="text" id="search_input" placeholder="도서명을 검색해주세요." v-model="state.searchContent"
              @keyup.enter="searchBookForAlimi()">
            <button style="height:40px;" @click="searchBookForAlimi()">조회</button>
          </div>
          <table style="margin-top:20px;width:100%;" id="search_table">
            <thead>
              <th>도서명</th>
              <th>저자</th>
              <th>출판사</th>
              <th>출판일</th>
            </thead>
            <tbody>
              <tr v-for="(data, idx) in state.aladinsearchrow" :key="idx">
                <td style="cursor: pointer;" @click="addAlimi(data.title, data.isbn)">{{ data.title }}</td>
                <td>{{ data.author }}</td>
                <td>{{ data.publisher }}</td>
                <td>{{ data.pubDate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { onMounted, reactive } from 'vue';


export default {
  setup() {
    const state = reactive({
      pageState: 0, //1: 알리미 등록
      searchContent: "", //검색 내용
      aladinsearchrow: [], //알라딘 검색결과
      page: 0,
      size: 10,
      myalimirow: [], //내 알리미 목록
      alimitotal:0, //내 알리미 전체갯수
      alimiId:[], //알리미 아이디
      selectAll: false,
    })

    //알리미 등록용 알라딘도서 조회
    const searchBookForAlimi = () => {
      axios.get(`/api/aladinbooks?query=${state.searchContent}`)
        .then((res) => {
          console.log('알라딘 조회 결과', res);
          state.aladinsearchrow = res.data.item;
        }).catch((err) => {
          console.log(err);
          alert('조회에 실패했습니다. 관리자에게 문의해주세요.');
        });
    };

    //알리미 등록
    const addAlimi = async(title, isbn) =>{
      await axios.post(`/api/alimi`,
      {
        bookName: title,
        isbn: isbn,
      }).then(()=>{
        alert('등록되었습니다.');
        state.pageState = 0;
        state.searchContent = "";
        getAllAlimi();

      }).catch((err)=>{
        alert('등록에 실패하였습니다. 관리자에게 문의해주세요.');
        console.log(err);
      });
    };

    //알리미 목록 조회
    const getAllAlimi = async() => {
      await axios.get(`/api/allalimi?page=${state.page}&size=${state.size}`).then((res)=>{
        console.log('내 알리미 목록',res);
        state.myalimirow = res.data.content;
        state.alimitotal = res.data.totalElements;
      }).catch((err)=>{
        console.log(err);
      })
    }

    //내 알리미 삭제
    const alimiDelete = async() => {
      await axios.delete(`/api/alimi`,{data: state.alimiId}).then(()=>{
        alert('삭제되었습니다.');
        getAllAlimi();
      }).catch((err)=>{
        alert('삭제에 실패하였습니다. 관리자에게 문의해주세요.');
        console.log(err);
      });
    };

    //페이지 이동
    const handlePage = (page) => {
      state.page = page - 1;
      getAllAlimi();
    };

    //전체선택 체크박스 컨트롤
    const checkAllAlimis = () => {
      if (state.selectAll) {
        // 모든 알리미 선택시 전체 alimiid를 담는다.
        state.alimiId = state.myalimirow.map((alimi) => alimi.alimiId);
      } else {
        // 모든 도서 선택 해제
        state.alimiId = [];
      }
    };

    onMounted(()=>{
      getAllAlimi();
    })

    return {
      state,
      searchBookForAlimi, //알리미 등록용 알라딘도서 조회
      addAlimi, //알리미 등록
      handlePage, //페이징 컨트롤
      checkAllAlimis, //전체선택 체크박스 컨트롤
      alimiDelete, //알리미 삭제
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
  height: 650px;
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

#menu_area>ul {
  width: 150px;
  margin-top: 20px;
}

#menu_area>ul>li {
  padding: 4px 0;
  font-size: 17px;
}

#right_content {
  width: 1000px;
  height: 200px;
  margin-left: 30px;
}

#current {
  font-weight: bold;
}

.alimi_menu>li {
  float: left;
  margin-top: 40px;
  font-size: 20px;
}

table {
  width: 949px;
  margin-top: 50px;
  margin-bottom: 30px;
  text-align: center;
}

thead {
  background: #f5f5f5;
  border-bottom: 1px solid #dddcdc;
  border-top: 1px solid #dddcdc;
  height: 46px;
}

tr {
  border-bottom: 1px solid #dddcdc;
  height: 46px;
}

button {
  width: 80px;
  height: 30px;
  color: white;
  background-color: #3DDCA3;
  border-radius: 5px;
  border: none;
  margin-bottom: 20px;
  margin-left: 10px;
  font-size: 17px
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
#alimi_reg_form {
  width: 1100px;
  height: 700px;
  background-color: #fff;
  text-align: center;
  position: fixed;
  border: 1px solid rgb(99, 96, 96);
  transform: translate(-50%, -50%);
  border-radius: 20px;
  top: 50%;
  left: 50%;
  z-index: 3;
  padding:0px 10px;
}

#search_input {
  width: 300px;
  height: 40px;
  border-radius: 10px;
  text-align: center;
  margin-top: 30px;
  border: 1px solid rgb(99, 96, 96);
}

#search_table td{
  font-size: 14px;
}
#search_table thead{
  height:33px;
}
#search_table th{
  font-size:15px;
}
#search_table tr{
  height:33px;
}
</style>
