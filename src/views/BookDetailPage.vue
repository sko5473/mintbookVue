<template>
  <div id="total_wrap">
    <div class="center_wrap">
      <div class="headerpage"></div>
      <div class="top_wrap">
        <div class="top_top_wrap">
          <div id="top_top_left">
            <p id="top_title">{{state.onebookrow.bookName}}</p>
            <p id="top_author">{{state.onebookrow.author}}(지은이) | {{state.onebookrow.publisher}} | {{state.onebookrow.publishDate}}</p>
          </div>
          <div id="top_top_right">
            <img src="../assets/BookDetailPage/share.png" alt="share" />
          </div>
        </div>
        <div class="top_bottom_wrap">
          <div class="top_bottom_left">
            <img src="../assets/MainPage/book5.jpg" alt="book" />
          </div>
          <table class="top_bottom_right">
            <tr>
              <td class="right_left">정가</td>
              <td class="right_right">{{ state.onebookrow.price }}</td>
            </tr>
            <tr class="line">
              <td class="right_left">판매가</td>
              <td class="right_right">
                <label id="price">{{ state.onebookrow.price * 0.9 }}</label>
                <label id="discount">(10%)</label>
              </td>
            </tr>
            <tr>
              <td class="right_left">적립금</td>
              <td class="right_right">
                <label>{{ state.onebookrow.price * 0.05 }}</label>
                <label id="point">(5%)</label>
              </td>
            </tr>
            <tr>
              <td class="right_left">배송료</td>
              <td class="right_right">15,000원 이상 무료배송</td>
            </tr>
            <tr class="line">
              <td class="right_left">독자평점</td>
              <td class="right_right">
                <label id="review">{{ state.onebookrow.star }}</label><label>/5점</label>
              </td>
            </tr>
            <tr class="line">
              <td class="right_left">수량</td>
              <td class="right_right">
                <el-input-number v-model="state.bookcount" :min="1" :max="10" size="large" />
              </td>
            </tr>
            <tr>
              <td colspan="2" id="button_top">
                <button id="alarm">알림신청</button>
              </td>
            </tr>
            <tr>
              <td colspan="2" id="button_bottom">
                <button id="dislike" @click="addWishList()" v-if="state.checkwishlist === false">
                  ♡
                </button>
                <button id="like" @click="deleteWishList()" v-if="state.checkwishlist === true">
                  ♥
                </button>
                <button id="cart">장바구니</button>
                <button id="buy" @click="buynow()">바로구매</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="content">
        <div class="aboutbook">
          <p class="content_title">책소개</p>
          <p class="content_content">
            한국과 미국, 전 세계를 오가며 ‘사장을 가르치는 사장’으로 알려진
            『돈의 속성』의 저자 김승호 회장의 신간이다. 평생 사장으로 살아온
            그의 경영철학 모두를 10여 년에 걸쳐 정리해 온 그는, 이번
            『사장학개론』 책을 통해 120가지 주제로 그 내용을 모두 담아
            완성했다.지난 7년간 3천 명의 사장 제자들을 만나 사장학 수업을
            진행하며 현실에서 겪는 다양한 문제에 대해, 사장들이 묻는 공통적인
            어려움이 존재했으며 그 문제들을 목차로 구성해 방향제시를
            더했다.한국KCA사장학교에 합격하고 저자를 기다리고 있는 사장들을
            만나기 위해 미국에 거주하는 기업인인 저자는 일 년에 두 번, 한국을
            방문해왔다. 하지만 한정된 기회와 한정된 인원으로 제한되는 상황이
            지속돼 사장학 수업 내용 전체를 담아 『사장학개론』 책으로 출판을
            결정하게 되었다.
          </p>
        </div>
        <div class="aboutauthor">
          <p class="content_title">작가정보</p>
          <p class="content_content">
            필명 세이노는 현재까지 믿고 있는 것들에 대해 No라고 말하라(Say No)는
            뜻이다. 2023년 기준 순자산 천억 원대 자산가다. 1955년생. 의사의
            장남으로 태어나 서너 살 유년기부터 아버지의 가르침을 받았다.
            아버지가 전 재산을 사기로 모두 날린 후 사망하면서 친부모를 모두
            여의고 고교시절부터 생활고에 크게 시달렸다.고교 3학년 때 건강과 가난
            때문에 휴학하고 친구 아버님과 친구들의 투자를 받아 사업을 했으나
            실패 후 복학하여 고교를 4년 만에 졸업하고 입대했다. 공군사병으로
            복무하는 동안 군부대 부동산 관리 업무와 도서관 관장을 맡았고, 제대
            후 영어공부에 몰두하여 미8군 내 메릴랜드대학 분교에 입학하였다.
            학비를 벌고자 보따리 장사부터 시작하여 과외ㆍ입시영어학원ㆍ번역업
            등을 했다.결혼 후에는 거의 십여 년 이상 쉬는 날 없이 밤늦도록 일과
            공부에 몰두하면서 의류업ㆍ정보처리ㆍ컴퓨터ㆍ음향기기ㆍ유통업ㆍ무역업
            등으로 자산을 모으기 시작했다. 그 자산을 외환투자ㆍ부동산경매ㆍ주식
            등으로 증대시켰고 학연ㆍ혈연ㆍ지연ㆍ정치적 배경 없이 홀로 현재의
            자산을 이룩했다.세계적인 다국적 기업의 아시아 지역 부사장직도
            겸임하였고 사업상 70여 개국을 여행했다. 국내에서 경영하였던 회사들은
            수출탑과 산업훈장을 받았으며, 인재경영대상후보로 오르기도
            했다.2003년부터는 사업을 줄여 왔고 광범위한 독서ㆍ음악ㆍ영화감상을
            즐긴다. 가장 좋아하는 것은 문제를 해결하는 것, 사람을 가르치고
            깨우치는 것이며, 가장 싫어하는 것은 접대 술자리, 기업 정치가들,
            부자인 척하는 자들의 블러핑. 매년 십억 원대의 소득세를 2000년까지
            5년 이상 세이노 개인이 납부하였고 2001년부터는 가족 단위로 납부하고
            있다.
          </p>
        </div>
        <div class="aboutinfo">
          <p class="content_title">기본정보</p>
          <ul class="content_content">
            <li>• ISBN: {{state.onebookrow.isbn}}</li>
            <li>• 출판일: {{state.onebookrow.publishDate}}</li>
          </ul>
        </div>
      </div>
      <div class="review_section">
        <div class="review_title">
          <label class="content_title">독자리뷰</label>
          <label id="review_cnt"> ({{ state.onebookreviewtotal }})</label>
        </div>
        <div class="review_btn">
          <div id="review_btn_left">
            <select v-model="state.star">
              <option value="5.0">5점</option>
              <option value="4.0">4점</option>
              <option value="3.0">3점</option>
              <option value="2.0">2점</option>
              <option value="1.0">1점</option>
            </select>
          </div>
          <div id="review_btn_right">
            <button id="r_register_btn" @click="reviewWrite()">리뷰등록</button>
          </div>
        </div>
        <textarea name="" id="" rows="10" placeholder="내용을 10자 이상 입력해 주세요. 주제와 무관한 댓글, 악플, 배송문의 등의 글은 임의 삭제될 수 있습니다."
          v-model="state.content"></textarea>
        <div class="reviewlist_top">
          <div class="reviewlist_top_left">
            <label class="reviewpoint" id="pointred">{{ state.onebookrow.star }}</label>
            <label class="pointtotal">/5.0</label>
            의 평점을 받았어요!
          </div>
          <div class="reviewlist_top_right">
            <select v-model="state.reviewOrderStatus" @change="handleOrderReview">
              <option value="recent">최신순</option>
              <option value="star">별점순</option>
            </select>
          </div>
        </div>
        <table class="reviewlist">
          <tr v-for="(data, idx) in state.onebookreviewrow" :key="idx">
            <td class="reviewlist_left">
              <label class="reviewpoint">{{ data.star }}</label>
              <label class="pointtotal">/5.0</label>
            </td>
            <td class="reviewlist_right">
              <p class="reviewer">{{ data.writer.slice(0, 3) }}** | {{ data.regDate.slice(0, 10) }}</p>
              <p>{{ data.content }}</p>
            </td>
          </tr>
        </table>
        <div id="pagination">
          <el-pagination layout="prev, pager, next" :total="state.onebookreviewtotal" :page-size="5"
            @current-change="handlePage" />
        </div>
      </div>
      <div class="recommend_section">
        <p class="content_title" id="recommend_title">이런 책도 추천해요!</p>
        <div class="content_bottom">
          <div class="content_book_wrap">
            <img src="../assets/MainPage/book1.jpg" alt="book1" class="c_image" />
            <p class="c_title">세이노의 가르침</p>
            <p class="c_author">세이원·데이원</p>
          </div>
          <div class="content_book_wrap">
            <img src="../assets/MainPage/book2.jpg" alt="book2" class="c_image" />
            <p class="c_title">세이노의 가르침</p>
            <p class="c_author">세이원·데이원</p>
          </div>
          <div class="content_book_wrap">
            <img src="../assets/MainPage/book3.jpg" alt="book3" class="c_image" />
            <p class="c_title">세이노의 가르침</p>
            <p class="c_author">세이원·데이원</p>
          </div>
          <div class="content_book_wrap">
            <img src="../assets/MainPage/book4.jpg" alt="book4" class="c_image" />
            <p class="c_title">세이노의 가르침</p>
            <p class="c_author">세이원·데이원</p>
          </div>
          <div class="content_book_wrap">
            <img src="../assets/MainPage/book5.jpg" alt="book5" class="c_image" />
            <p class="c_title">세이노의 가르침</p>
            <p class="c_author">세이원·데이원</p>
          </div>
        </div>
      </div>
      <div class="cs_section">
        <div class="cs_top">
          <div class="content_title">반품/교환안내</div>
          <div class="cs_top_right">
            <button id="csbutton">1:1문의</button>
          </div>
        </div>
        <div class="cs_content">
          <p>반품/교환방법</p>
          <p>
            마이룸 > 주문관리 > 주문/배송내역 > 주문조회 > 반품/교환 신청, [1:1
            상담 > 반품/교환/환불] 또는 고객센터 (1544-1900)* 오픈마켓, 해외배송
            주문, 기프트 주문시 [1:1 상담>반품/교환/환불] 또는 고객센터
            (1544-1900)
          </p>
          <p class="blank"></p>
          <p>반품/교환가능 기간</p>
          <p>
            변심반품의 경우 수령 후 7일 이내,상품의 결함 및 계약내용과 다를 경우
            문제점 발견 후 30일 이내
          </p>
          <p class="blank"></p>
          <p>반품/교환비용</p>
          <p>변심 혹은 구매착오로 인한 반품/교환은 반송료 고객 부담</p>
          <p class="blank"></p>
          <p>반품/교환 불가 사유</p>
          <p>
            1. 소비자의 책임 있는 사유로 상품 등이 손실 또는 훼손된 경우(단지
            확인을 위한 포장 훼손은 제외) 2. 소비자의 사용, 포장 개봉에 의해
            상품 등의 가치가 현저히 감소한 경우예 화장품, 식품,
            가전제품(악세서리 포함) 등 3. 복제가 가능한 상품 등의 포장을 훼손한
            경우예 음반/DVD/비디오, 소프트웨어, 만화책, 잡지, 영상 화보집4
            소비자의 요청에 따라 개별적으로 주문 제작되는 상품의 경우
            ((1)해외주문도서)5 디지털 컨텐츠인 eBook, 오디오북 등을 1회 이상
            다운로드를 받았을 경우6. 시간의 경과에 의해 재판매가 곤란한 정도로
            가치가 현저히 감소한 경우7. 전자상거래 등에서의 소비자보호에 관한
            법률이 정하는 소비자 청약철회 제한 내용에 해당되는 경우
          </p>
          <p class="blank"></p>
          <p>상품 품절</p>
          <p>
            공급사(출판사) 재고 사정에 의해 품절/지연될 수 있으며, 품절 시 관련
            사항에 대해서는 이메일과 문자로 안내드리겠습니다.
          </p>
          <p class="blank"></p>
          <p>소비자 피해보상 환불 지연에 따른 배상</p>
          <p>
            1) 상품의 불량에 의한 교환, A/S, 환불, 품질보증 및 피해보상 등에
            관한 사항은 소비자분쟁 해결 기준 (공정거래위원회 고시)에 준하여
            처리됨2) 대금 환불 및 환불지연에 따른 배상금 지급 조건, 절차 등은
            전자상거래 등에서의 소비자 보호에 관한 법률에 따라 처리함
          </p>
        </div>
      </div>
      <div>
        <el-backtop :right="70" :bottom="70" style="color: #3ddca3" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      bookcount: 0,
      star: 5, //리뷰 평점
      content: "", //리뷰 내용
      bookId: route.query.id,
      checkwishlist: false,
      page: 0,
      size: 5,
      onebookreviewrow: [],
      onebookreviewtotal: 0,
      onebookrow: [],
      reviewOrderStatus: "recent",

    });

    //바로구매 클릭시 결제정보 미리보기 페이지 이동
    const buynow = () => {
      const preBuyInfo = [{
        bookName: state.onebookrow.bookName,
        author: state.onebookrow.author,
        buyCount: state.bookcount,
        price: state.onebookrow.price
      }];
      //이동전 세션스토리지에 결제미리보기 정보 전달
      sessionStorage.setItem('preBuyInfo', JSON.stringify(preBuyInfo));

      router.push({path : '/order'});
    }

    //리뷰 정렬
    const handleOrderReview = async () => {
      if (state.reviewOrderStatus === "recent") {
        reviewall();
      } else if (state.reviewOrderStatus === "star") {
        await axios.get(`/api/onebookreviewallorderbystar?bookid=${state.bookId}&page=${state.page}&size=${state.size}`).then((res) => {
          console.log('현재 책 리뷰 목록 별점순', res);
          state.onebookreviewrow = res.data.content;
        }).catch((err) => {
          console.log(err);
        });
      }
    }

    //리뷰 작성
    const reviewWrite = async () => {
      await axios
        .post(`/api/review`, {
          star: state.star,
          content: state.content,
          bookId: state.bookId,
        })
        .then(() => {
          alert("등록되었습니다.");
          state.star = null;
          state.content = null;
        })
        .catch((err) => {
          console.log(err);
          alert("리뷰등록 실패하였습니다. 관리자에게 문의해주세요.");
        });
    };

    //찜 추가
    const addWishList = async () => {
      await axios
        .post(`/api/wishlist?id=${state.bookId}`)
        .then(() => {
          state.checkwishlist = true;
        })
        .catch((err) => {
          console.log(err);
          alert("찜 추가 실패");
        });
    };

    //찜 삭제
    const deleteWishList = async () => {
      await axios
        .delete(`/api/wishlist?id=${state.bookId}`)
        .then(() => {
          state.checkwishlist = false;
        })
        .catch((err) => {
          console.log(err);
          alert("찜 삭제 실패");
        });
    };

    //찜 유무 체크
    const checkwishlist = async () => {
      await axios
        .get(`/api/checkwishlist?id=${state.bookId}`)
        .then((res) => {
          console.log("찜유무", res);
          state.checkwishlist = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    //현재 책 리뷰 목록
    const reviewall = async () => {
      axios.get(`/api/onebookreviewall?bookid=${state.bookId}&page=${state.page}&size=${state.size}`).then((res) => {
        console.log('현재 책 리뷰 목록', res);
        state.onebookreviewrow = res.data.content;
        state.onebookreviewtotal = res.data.totalElements;
      }).catch((err) => {
        console.log(err);
      });
    };

    //도서 1개 데이터 수신
    const bookone = async () => {
      await axios.get(`/api/bookone?id=${state.bookId}`).then((res) => {
        console.log('도서 1개 데이터', res);
        state.onebookrow = res.data;
      }).catch((err) => {
        console.log(err);
      })
    }

    //현재 책 리뷰 페이징 컨트롤
    const handlePage = (page) => {
      state.page = page - 1;
      reviewall();
    };

    onMounted(() => {
      checkwishlist(); //찜 유무 체크
      reviewall(); //현재 책 리뷰 목록
      bookone(); //도서 1개 데이터 수신
    });

    return {
      state,
      reviewWrite,
      addWishList, //찜 추가
      deleteWishList, //찜 삭제
      handlePage, //현재 책 리뷰 페이징 컨트롤
      handleOrderReview, //리뷰 정렬
      buynow, //바로구매
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

/*1200px 중앙정렬 */
.center_wrap {
  width: 1200px;
  margin: 0 auto;
}

/*HeaderPage용 공백 */
.headerpage {
  height: 95px;
}

/*상단영역 */
/*제목&공유 영역 */

.top_wrap {
  margin-top: 50px;
  padding-bottom: 100px;
  border-bottom: 0.5px solid #bdbdbd;
}

.top_top_wrap {
  display: grid;
  grid-template-columns: 9fr 1fr;
  padding-bottom: 10px;
  border-bottom: 0.5px solid #bdbdbd;
}

#top_title {
  font-size: 32px;
  font-weight: bold;
}

#top_author {
  font-size: 16px;
  color: #6f6f6f;
  margin-top: 10px;
}

#top_top_right {
  text-align: right;
}

#top_top_right>img {
  width: 30px;
  margin-top: 20px;
}

/*이미지&가격 영역 */
.top_bottom_wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 30px;
}

.top_bottom_left>img {
  width: 419px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.top_bottom_right {
  width: 100%;
  border-collapse: collapse;
}

.right_left {
  font-size: 20px;
  width: 150px;
}

.right_right {
  font-size: 20px;
}

#price {
  font-size: 28px;
  color: #3ddca3;
}

#discount,
#point {
  color: #7c7c7c;
}

#review {
  font-weight: bold;
  color: #df7474;
}

/*버튼 */
#alarm {
  width: 135px;
  height: 44px;
  border: 1px solid #7c7c7c;
  border-radius: 10px;
  background: white;
}

#button_top {
  text-align: right;
}

#button_bottom>button {
  width: 193px;
  height: 62px;
  border-radius: 10px;
  font-size: 18px;
}

#like {
  border: 0.5px solid #b1b1b1;
  background-color: white;
  color: red;
  margin-right: 10.5px;
}

#dislike {
  border: 0.5px solid #b1b1b1;
  background-color: white;
  color: #b1b1b1;
  margin-right: 10.5px;
}

#cart {
  border: 0.5px solid #dadada;
  background: #dadada;
  margin-right: 10.5px;
}

#buy {
  border: 0.5px solid #3ddca3;
  background: #3ddca3;
  color: white;
}

.line {
  border-bottom: 0.5px solid #bdbdbd;
}

/*콘텐츠 영역 */
.content {
  margin-top: 100px;
  border-bottom: 0.5px solid #bdbdbd;
}

.content_title {
  font-size: 32px;
  color: #3ddca3;
  margin-bottom: 30px;
}

.content_content {
  font-size: 14px;
  color: #808080;
}

.content>div {
  margin-top: 50px;
  margin-bottom: 100px;
}

/*리뷰 영역 */

.review_section {
  margin-top: 50px;
  padding-bottom: 200px;
}

.review_title {
  margin-bottom: 50px;
}

#review_cnt {
  color: #808080;
  font-size: 32px;
}

.review_btn {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 20px;
}

button {
  width: 115px;
  height: 36px;
  border-radius: 10px;
  font-size: 12px;
  cursor: pointer;
}

select {
  width: 130px;
  height: 36px;
  border-radius: 10px;
  font-size: 12px;
  text-align: center;
  color: #3ddca3;
  font-weight: bold;
}

select>option {
  font-size: 12px;
  margin: 20px;
}

#r_register_btn {
  border: 1px solid #3ddca3;
  background: #3ddca3;
  color: white;
}

#review_btn_left {
  text-align: left;
}

#review_btn_right {
  text-align: right;
}

textarea {
  border: 1px solid black;
  border-radius: 10px;
  width: 1200px;
  height: 239px;
  resize: none;
  outline: none;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 50px;
}

/*리뷰리스트영역 */
.reviewlist_top {
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 24px;
  padding-bottom: 20px;
  border-bottom: 0.5px solid #bdbdbd;
}

.reviewpoint {
  font-size: 36px;
  color: #3ddca3;
  font-weight: bold;
}

.pointtotal {
  font-size: 20px;
  color: #878787;
}

#pointred {
  color: #df7474;
}

.reviewlist_top_right {
  text-align: right;
}

/* 리뷰리스트 테이블영역 */

.reviewlist {
  width: 100%;
  border-collapse: collapse;
}

.reviewlist_left,
.reviewlist_right {
  padding-top: 25px;
  padding-bottom: 25px;
  border-bottom: 0.5px solid #bdbdbd;
}

.reviewlist_left {
  width: 120px;
}

.reviewer {
  color: #818181;
  margin-bottom: 10px;
}

#pagination {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

/*추천영역 */

.recommend_section {
  padding-bottom: 100px;
  border-bottom: 0.5px solid #bdbdbd;
}

#recommend_title {
  color: black;
}

.content_bottom {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  margin-top: 40px;
}

.content_book_wrap {
  margin-bottom: 20px;
}

.c_ranking {
  font-size: 36px;
  font-weight: bolder;
  color: #3ddca3;
}

.c_image {
  width: 210px;
  border: 0.5px solid #c6c4c4;
}

.c_title {
  font-size: 15px;
}

.c_author {
  font-size: 13px;
  color: #998f8f;
}

/*반품교환안내 영역*/

.cs_top {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 100px;
}

.cs_top_right {
  text-align: right;
}

#csbutton {
  border: 1px solid #3ddca3;
  background: #3ddca3;
  color: white;
}

.cs_content {
  width: 1200px;
  color: #818181;
}

.blank {
  margin-bottom: 15px;
}
</style>
