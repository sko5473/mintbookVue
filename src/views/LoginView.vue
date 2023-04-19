<template>
    <div>
        <div>
            <label for="id">id</label>
            <input type="text" v-model="state.form.email">
        </div>
        <div>
            <label for="pw">pw</label>
            <input type="password" v-model="state.form.password">
        </div>

        <div>
            <button @click="submit()">로그인</button>
            <button @click="memberVerify()">회원인증</button>
        </div>
        accessToken:{{ state.accessToken }}<br>
        refreshToken: {{ state.refreshToken }}
    </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

export default {
    setup() {
        const state = reactive({
            form: {
                email: "",
                password: ""
            },
            accessToken: Cookies.get('accessToken'),
            refreshToken: Cookies.get('refreshToken'),
        });
        const router = useRouter();
        const api = axios.create({
            baseURL: '/api',
        });
        const submit = async () => {
            await axios.post(`/api/members/login`, state.form).then((res) => {
                console.log(res);
                window.alert("로그인에 성공하셨습니다.");
                //로그인 성공시 토큰(accessToken, grantType, refreshToken) 쿠키값 설정
                Cookies.set('accessToken', res.data.accessToken);
                Cookies.set('refreshToken', res.data.refreshToken);
            }).catch((err) => {
                console.log(err);
                window.alert("로그인에 실패하셨습니다.");
            })
        };
        api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response.status === 403 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    const refreshdata = await axios.post('/api/members/refreshcheck', 
                    {
                        accessToken: Cookies.get('accessToken'),
                        grantType: 'Bearer',
                        refreshToken: Cookies.get('refreshToken')
                    })
                    .catch((err)=>{
                        window.alert("다시 로그인하세요.", err);
                    });
                    console.log("리프레쉬데이터",refreshdata);
                    if(refreshdata == undefined ){
                        console.log('refresh토큰이 만료되었습니다.');
                        return Promise.reject(error);
                    }
                    try {
                        const { data } = await api.post('/members/refreshaccesstoken', 
                        {
                            accessToken: Cookies.get('accessToken'),
                            grantType: 'Bearer',
                            refreshToken: Cookies.get('refreshToken')
                        });
                        Cookies.set('accessToken', data.accessToken);
                        originalRequest.headers.Authorization =
                            'Bearer' + ' ' + Cookies.get('accessToken');
                        return api(originalRequest);
                    } 
                     catch (error) {
                        console.log(error);
                        window.alert('토큰 갱신에 실패했습니다. 재 로그인 하세요.');
                        router.push('/login');
                        return Promise.reject(error);
                    }
                }
                return Promise.reject(error);
            }
        );
        const memberVerify = async () => {
            await api
                .post('/members/baba', null, {
                    headers: {
                        Authorization:
                        'Bearer' + ' ' + Cookies.get('accessToken'),
                    },
                })
                .then((res) => {
                    console.log(res);
                    window.alert('회원인증에 성공하셨습니다.');
                })
                .catch((err) => {
                    console.log(err);
                    window.alert('회원인증에 실패하셨습니다.');
                });
        };
        return {
            state,
            submit,
            memberVerify,
        }
    }
}
</script>

<style lang="css" scoped></style>