import { createRouter, createWebHistory } from "vue-router";

//유저 파트
import MainPage from "../views/MainPage";
import SearchPage from "../views/SearchPage";
import BookDetailPage from "../views/BookDetailPage";
import CartPage from "../views/CartPage";
import OrderPage from "../views/OrderPage";
import OrderResultPage from "../views/OrderResultPage";
import BestsellerPage from "../views/BestsellerPage";
import NewBookPage from "../views/NewBookPage";
import CategoryPage from "../views/CategoryPage";
import EditorPickPage from "../views/EditorPickPage";
import EventPage from "../views/EventPage";
import EventDetailPage from "../views/EventDetailPage";
import CSPage from "../views/CSPage";
import CSRegisterPage from "../views/CSRegisterPage";
import FAQPage from "../views/FaqPage";
import NoticePage from "../views/NoticePage";
import NoticeDetailPage from "../views/NoticeDetailPage";
import LoginPage from "../views/LoginPage";
import JoinPage from "../views/JoinPage";
import FindIdPw from "../views/FindIdPw";
import MyPage from "../views/MyPage/MyPage";
import MyInfoEditPage from "../views/MyPage/MyInfoEditPage";
import MyPickPage from "../views/MyPage/MyPickPage";
import MyCashPointPage from "../views/MyPage/MyCashPointPage";
import InquirePage from "../views/MyPage/InquirePage";
import MyReviewList from "../views/MyPage/MyReviewList";
import MyReviewDetailPage from "../views/MyPage/MyReviewDetailPage";
import AlimiPage from "../views/MyPage/AlimiPage";

//관리자 파트
import ALoginPage from "../views/Admin/ALoginPage";
import ABookPage from "../views/Admin/ABookPage";
import ABookSearchPage from "../views/Admin/ABookSearchPage";
import ABookDetailPage from "../views/Admin/ABookDetailPage";
import ABookRegisterPage from "../views/Admin/ABookRegisterPage";
import ABookEditPage from "../views/Admin/ABookEditPage";
import AOrderPage from "../views/Admin/AOrderPage";
import AOrderSearchPage from "../views/Admin/AOrderSearchPage";
import AOrderDetailPage from "../views/Admin/AOrderDetailPage";
import AEventPage from "../views/Admin/AEventPage";
import AEventSearchPage from "../views/Admin/AEventSearchPage";
import AEventDetailPage from "../views/Admin/AEventDetailPage";
import AEventEditPage from "../views/Admin/AEventEditPage";
import AEventRegisterPage from "../views/Admin/AEventRegisterPage";
import AMemberPage from "../views/Admin/AMemberPage";
import ANoticePage from "../views/Admin/ANoticePage";
import ANoticeRegisterPage from "../views/Admin/ANoticeRegisterPage";
import ANoticeDetailPage from "../views/Admin/ANoticeDetailPage";
import ANoticeEditPage from "../views/Admin/ANoticeEditPage";
import AReviewPage from "../views/Admin/AReviewPage";
import AReviewDetailPage from "../views/Admin/AReviewDetailPage";

const routes = [
  {
    path: "/",
    name: "mainpage",
    component: MainPage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/join",
    name: "join",
    component: JoinPage,
  },
  {
    path: "/findidpw",
    name: "findidpw",
    component: FindIdPw,
  },
  {
    path: "/mypage/mypage",
    name: "mypage",
    component: MyPage,
  },
  {
    path: "/mypage/mypick",
    name: "mypick",
    component: MyPickPage,
  },
  {
    path: "/mypage/cashpoint",
    name: "cashpoint",
    component: MyCashPointPage,
  },
  {
    path: "/mypage/inquire",
    name: "inquire",
    component: InquirePage,
  },
  {
    path: "/mypage/review/list",
    name: "myreviewlist",
    component: MyReviewList,
  },
  {
    path: "/mypage/review/detail",
    name: "myreviewdetail",
    component: MyReviewDetailPage,
  },
  {
    path: "/mypage/alimi",
    name: "alimi",
    component: AlimiPage,
  },
  {
    path: "/mypage/myinfoedit",
    name: "myinfoedit",
    component: MyInfoEditPage,
  },
  {
    path: "/search",
    name: "searchpage",
    component: SearchPage,
  },
  {
    path: "/book",
    name: "book",
    component: BookDetailPage,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartPage,
  },
  {
    path: "/order",
    name: "order",
    component: OrderPage,
  },
  {
    path: "/order-result",
    name: "orderresult",
    component: OrderResultPage,
  },
  {
    path: "/bestseller",
    name: "bestseller",
    component: BestsellerPage,
  },
  {
    path: "/new",
    name: "new",
    component: NewBookPage,
  },
  {
    path: "/category",
    name: "category",
    component: CategoryPage,
  },
  {
    path: "/editorpick",
    name: "editorpick",
    component: EditorPickPage,
  },
  {
    path: "/event",
    name: "event",
    component: EventPage,
  },
  {
    path: "/event/detail",
    name: "event/detail",
    component: EventDetailPage,
  },
  {
    path: "/cs",
    name: "cs",
    component: CSPage,
  },
  {
    path: "/cs/register",
    name: "csregister",
    component: CSRegisterPage,
  },
  {
    path: "/faq",
    name: "faq",
    component: FAQPage,
  },
  {
    path: "/notice",
    name: "notice",
    component: NoticePage,
  },
  {
    path: "/notice/detail",
    name: "noticedetail",
    component: NoticeDetailPage,
  },
  {
    path: "/admin/login",
    name: "adminlogin",
    component: ALoginPage,
  },
  {
    path: "/admin/book",
    name: "adminbook",
    component: ABookPage,
  },
  {
    path: "/admin/member",
    name: "adminmember",
    component: AMemberPage,
  },
  {
    path: "/admin/book/search",
    name: "adminbooksearch",
    component: ABookSearchPage,
  },
  {
    path: "/admin/book/detail",
    name: "adminbookdetail",
    component: ABookDetailPage,
  },
  {
    path: "/admin/book/register",
    name: "adminbookregister",
    component: ABookRegisterPage,
  },
  {
    path: "/admin/book/edit",
    name: "adminbookedit",
    component: ABookEditPage,
  },
  {
    path: "/Aorder",
    name: "adminorder",
    component: AOrderPage,
  },
  {
    path: "/admin/order/search",
    name: "adminordersearch",
    component: AOrderSearchPage,
  },
  {
    path: "/admin/order/detail",
    name: "adminorderdetail",
    component: AOrderDetailPage,
  },
  {
    path: "/admin/event",
    name: "adminevent",
    component: AEventPage,
  },
  {
    path: "/admin/event/search",
    name: "admineventsearch",
    component: AEventSearchPage,
  },
  {
    path: "/admin/event/detail",
    name: "admineventdetail",
    component: AEventDetailPage,
  },
  {
    path: "/admin/event/edit",
    name: "admineventedit",
    component: AEventEditPage,
  },
  {
    path: "/admin/event/register",
    name: "admineventregister",
    component: AEventRegisterPage,
  },
  {
    path: "/admin/notice",
    name: "adminnotice",
    component: ANoticePage,
  },
  {
    path: "/admin/notice/register",
    name: "adminnoticeregister",
    component: ANoticeRegisterPage,
  },
  {
    path: "/admin/notice/detail",
    name: "adminnoticedetail",
    component: ANoticeDetailPage,
  },
  {
    path: "/admin/notice/edit",
    name: "adminnoticeedit",
    component: ANoticeEditPage,
  },
  {
    path: "/admin/review",
    name: "adminreview",
    component: AReviewPage,
  },
  {
    path: "/admin/review/detail",
    name: "adminreviewdetail",
    component: AReviewDetailPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
