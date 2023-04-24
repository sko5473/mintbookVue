<template>
    <div id="total_wrap">
        <div id="divide_wrap">
            <div id="nav_wrap">
                <admin-menu-page></admin-menu-page>
            </div>
            <div id="content_wrap">
                <p id="maintitle">도서관리</p>
                <label>
                    <select>
                        <option value="title">도서명</option>
                        <option value="author">저자명</option>
                        <option value="isbn">ISBN</option>
                        <option value="publisher">출판사</option>
                    </select>
                </label>
                <label>
                    <input type="text">
                </label>
                <button id="search" @click="BookSearch()">검색</button>
                <button id="register">도서등록</button>
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
                        <tr v-for="tmp of state.num" :key="tmp">
                            <th scope="row">{{ tmp }}</th>
                            <td>98746565163521</td>
                            <td>불행한 당신을 위하여</td>
                            <td>김다인</td>
                            <td>팩토리나인</td>
                            <td>2023-03-09</td>
                            <td>5</td>
                            <td>12,900원</td>
                        </tr>
                    </tbody>
                </table>
                <div id="pagination">
                    <el-pagination layout="prev, pager, next" :total="50" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';
import AdminMenuPage from '../../components/AdminMenuPage.vue';
import router from '@/router';

export default {
    components:{
        AdminMenuPage
    },

    setup () {
        const state = reactive({
            num:["1","2","3","4","5","6","7","8","9","10"]
        })

        const BookSearch=()=>{
            router.push("/admin/book/search");
        }

        return {
            state,
            BookSearch
        }
    }
}
</script>
import 
<style lang="css" scoped>
    /*초기화 */
    *{
    padding:0;
    margin:0;
    }

    ul,li{
        list-style: none;
    }

    a{
        text-decoration: none;
        color: black;
    }
    a:hover{
        color: black;
        font-weight: bold;
    }

    /*전체 페이지 영역 */
    #divide_wrap{
        /* width: 1920px; */
        display: grid;
        grid-template-columns: 290px auto;
    }

    #content_wrap{
        padding-left: 30px;
        padding-right: 30px;
    }

    /*콘텐츠 상단 영역 */
    #maintitle{
        font-size: 24px;
        font-weight: bold;
        margin-top: 50px;
        margin-bottom:70px;
    }

    button{
        width: 100px;
        border-radius: 5px;
        color: white;
        background: black;
    }

    select{
        width: 100px;
        height: 28px;
        margin-right: 20px;
    }

    input{
        margin-right: 10px;
    }

    #register{
        margin-left: 50px;
        float:right;
    }

    /*콘텐츠 하단 영역 */
    #nav_wrap{
        background: rgb(223, 223, 223);
        height: 100vh;
    }

    .table{
        width: 100%;
        margin-top:30px;
        margin-bottom: 30px;
    }

    #pagination{
        display: flex;
        justify-content: center;
    }
    

    
</style>