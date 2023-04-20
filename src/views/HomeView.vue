<template>
    <div>
        <h2>홈(네이버 콜백)</h2>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
    setup () {
        const route = useRoute();
        const router = useRouter();

        const state = reactive({
            naverClientId: 'UWRvT59b1Pv1JV8c8_T4',
            naverCallbackUrl: 'http://localhost:8080', //로그인 성공시 callback url
            naverclientSecret: 'L3bZiXKHGq',
            navercode: route.query.code, //네이버 로그인 인증에 성공하면 반환받는 인증 코드, 접근 토큰(access token) 발급에 사용
            naverstates: route.query.state,//사이트 간 요청 위조 공격을 방지하기 위해 애플리케이션에서 생성한 상태 토큰으로 URL 인코딩을 적용한 값
            naver_access_token: "",
            naver_refresh_token: "",
            snsProfile: "",
            name: "",
            snsId: "",
            gender: "",
            birth: "",
            email: "",
            snsType: "",
        });
        
        const api = axios.create({
            baseURL: '/api',
        });

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

        // callback url
        const naverCallback = async() => {
            console.log('route.query.code => ', route.query.code); //파라미터로 전달받은 code값
            console.log('route.query.states => ', route.query.state); //파라미터로 전달받은 state값

            //grant_type : 인증 과정에 대한 구분값 1) 발급:'authorization_code' 2) 갱신:'refresh_token' 3) 삭제: 'delete'
            const url = `/oauth2.0/token?grant_type=authorization_code&client_id=${state.naverClientId}&client_secret=${state.naverclientSecret}&code=${state.navercode}&state=${state.naverstates}`;
            const headers = {"X-Naver-Client-Id": state.naverClientId, "X-Naver-Client-Secret": state.naverclientSecret};
            const { data } = await axios.get(url, {headers});
            
            console.log("data => " , data);
            
            console.log("data.access_token => " , data.access_token);
            state.naver_access_token = data.access_token
            
            console.log("data.refresh_token => " , data.refresh_token);
            state.naver_refresh_token = data.refresh_token 
            
            naverUserInfo();
        }
        
        //네이버 로그인 access토큰 만료시 intercept용
        const naverapi = axios.create({
            baseURL: '/',
        });

        // 사용자 정보 전달받기
        const naverUserInfo = async() => {
            const url = `/v1/nid/me`; //프로필 정보 조회URL
            let header = "Bearer " + state.naver_access_token;
            const headers = {"Authorization": header};
            console.log("headers => ", headers);
            const { data } = await naverapi.get(url, { headers });
            console.log("*****naverUserInfo data***** => ", data);

            const date = new Date();

            // 변수에 값 넣기(연동 회원가입에 사용)
            state.email = data.response.email;
            state.birth = date.getFullYear()+"-"+data.response.birthday; //05-23형식이므로 연도를 더해서 JAVA DateTime포맷을 맞춘다.
            state.gender = data.response.gender;
            state.snsId = data.response.id; //네이버에서 발급해주는 고유한 id값(기 연동된 유저인지 판별에 사용)
            state.name = data.response.name;
            state.snsProfile = data.response.profile_image;
            state.snsType = 'Naver';

            naverSnsIdCheck(state.snsId);
        }

        //네이버 access_Token만료시(401오류) refresh토큰으로 access토큰을 재발급 
        // naverapi.interceptors.response.use(
        //     (response) => response,
        //     async (error) => {
        //         const originalRequest = error.config;

        //         //401에러거나 재시도한적이 없을 때
        //         if (error.response.status === 401 && !originalRequest._retry) {
        //             originalRequest._retry = true;

        //             //리프레쉬토큰 재발급 요청
        //             const refreshdata = await axios.post(`oauth2.0/token?grant_type=refresh_token&client_id=${state.naverClientId}&client_secret=${state.naverclientSecret}&refresh_token=${state.naver_refresh_token}`)
        //             .then((res)=>{
        //                 //재발급 받은 access토큰을 다시 저장 후
        //                 state.naver_access_token = res.data.access_token;
        //                 //중단됐던 로직 재실행
        //                 naverUserInfo();
        //             })
        //             .catch((err)=>{
        //                 console.log(err);
        //                 window.alert("네이버access토큰 재발급에 실패했습니다. 다시 로그인해주세요.");
        //                 router.push({path:'/login'});
        //                 return Promise.reject(error);
        //             });
        //             if(refreshdata == undefined ){
        //                 return Promise.reject(error);
        //             }
        //         }
        //         return Promise.reject(error);
        //     }
        // );

        //가입 중복여부 확인
        const naverSnsIdCheck = async(snsId) => {
            await axios.post(`/api/members/snscheck`,{snsId : snsId}).then((res)=>{
                console.log('결과',res);
                console.log('결과',res.data);

                //조회 결과 sns연동계정이 있으면 로그인
                if(res.data === true) {
                    axios.post(`/api/members/snslogin`,{snsId : snsId}).then((res)=>{
                        console.log(res);
                        window.alert("로그인에 성공하셨습니다.");
                        //로그인 성공시 토큰(accessToken, grantType, refreshToken) 쿠키값 설정
                        Cookies.set('accessToken', res.data.accessToken);
                        Cookies.set('refreshToken', res.data.refreshToken);
                    }).catch((err)=>{
                        console.log(err);
                        window.alert("로그인에 실패하셨습니다.");
                    })
                } else {
                    // 없으면 회원가입
                    if(confirm("자동 회원가입 후 로그인하시겠습니까?")){
                        axios.post(`/api/members/snsjoin`,
                        {
                            email: state.email,
                            birth: state.birth,
                            gender: state.gender,
                            snsId: state.snsId,
                            name: state.name,
                            snsProfile: state.snsProfile,
                            snsType: state.snsType
                        }).then((res)=>{
                            console.log(res);
                            window.alert("회원가입 후 로그인에 성공하셨습니다.");
                        }).catch((err)=>{
                            console.log(err);
                            window.alert("회원가입 후 로그인에 실패하셨습니다.");
                        })
                    } else {
                        return false;
                    }
                }
            }).catch((err)=>{
                console.log(err);
            });
        }

        onMounted(()=>{
            naverCallback();
        });

        return {
            state,
        }
    }
}
</script>

<style lang="css" scoped>

</style>