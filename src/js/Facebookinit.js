import store from "@/store/index"
import axios from "axios";

const initializeFacebookSDK = () => {
	window.fbAsyncInit = function() {
		window.FB.init({
		appId: '2692732430895830',
		cookie: true,
		xfbml: true,
		version: 'v16.0'
		});
        //로그인상태 체크
		window.FB.getLoginStatus((res)=>{
			//피니아에 토큰정보 등을 저장
            // const store = useStore();
            console.log('로그인상태체크',res);
            if(res.status === 'connected'){
                store.commit("flogin");
                console.log('로그인이다',res.authResponse.accessToken);
                //accesstoken을 서버로 보내서 서버에서 다시 페이스북으로 검증url을 쏴준다(결과값은 토큰이 유효한지 아닌지를 돌려준다.)
                axios.post(`/api/members/fsnslogin`,
                {
                     
                },
                {
                    headers:{
                        'Authorization': `${res.authResponse.accessToken}`
                    }
                }).then((res)=>{
                    console.log('토큰 검증 결과', res);
                })
            } else {
                store.commit("flogout");
                console.log('로그아웃이다');
            }
		});

		window.FB.AppEvents.logPageView();
	};
};

export { initializeFacebookSDK as default }; 