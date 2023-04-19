<template>
    <div id="header_wrap">
        <div class="header_wrap_inner">
            <div class="header_left">
                <ul>
                    <li class="menu_btn">
                        <a href="#">
                            <img src="../assets/Menu.png" alt="menu_bar">
                        </a>
                    </li>
                    <li class="logo">
                        <a href="#">
                            <img src="../assets/mintlogo.png" alt="logo_img">
                        </a>
                    </li>
                </ul>
                <div class="demo-input-size">
                <input type="text" class="search">
                <el-button type="primary" :icon="Search">Search</el-button>
                </div>
                <ul>
                    <li><a href="#">로그인</a></li>
                    <li><a href="#">회원가입</a></li>
                    <li><a href="#">고객센터</a></li>
                    <li><a href="#">마이페이지</a></li>
                </ul>
            </div>
            <div class="header_right">

            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue'

export default {
    setup () {
        const state = reactive({
            small_navbar: false,
        });

        return {
            state,
        }
    }
}
</script>

<style lang="css" scoped>
#header_wrap{ width: 1920px; height: 95px; background-color: antiquewhite;}
.header_wrap_inner{ width: 1200px; height:95px; background-color: aquamarine; margin: 0 auto;}
.menu_btn, .logo{ float: left;}
.logo>a>img{ width: 150px;}
.menu_btn>a>img{ width: 40px; }
.bye{ border-radius: 15px;}
</style>