import axios from "axios"
import instance from "./Instance";
// import Cookies from 'js-cookie'; // js-cookie 라이브러리를 가져옴
import { getCookieToken, getaccessToken, setRefreshToken, setaccessToken } from "../Common/Cookie";
import { cookies } from "../Common/Cookie";
/**
 * 로컬에서 사용하는 baseURL
 */
// const baseURL = '/api'

// /**
//  * 배포버전에서 사용하는 baseURL
//  */
// const baseURL = 'http://127.0.0.1:8000/api'

/**
 * AWS 인증 요청 주소
 */
const baseURL = 'https://7wkx0w4ygg.execute-api.ap-northeast-2.amazonaws.com/release/'

/**
 * 로그인 성공시 로컬 스토리지에 acc/rfc 토큰 담아주기
 * @param {*} email 
 * @param {*} pw 
 * @returns 로그인 성공/실패 여부로 비동기 적으로 true/false 반환
 *  
 */

const login = async (email, pw) => {
    const apiURL = 'https://b6saprgg73.execute-api.ap-northeast-2.amazonaws.com/plz/login';
    const requestData = {
        'email': email,
        'password': pw
    };
    const finaldata = JSON.stringify(requestData);

    return await axios.post(apiURL, finaldata, {
        headers: {
          'Content-Type': 'application/json', // JSON 데이터를 보내는 것을 명시
        },
        withCredentials : true

    })
    .then(res =>{
        console.log(res)
        if(res.data.statusCode === 200){
            return res.data
        }else{
            return undefined
        }
    })
    .catch(error =>{
        console.log(error)
        return undefined
    })

    
    // js-cookie를 사용하여 쿠키에 토큰 저장
    // Cookies.set('access_token', accessToken);
    // Cookies.set('refresh_token', refreshToken);
    
    // const accessToken = response.data.token.access;
    // const refreshToken = response.data.token.refresh;
    // instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    // localStorage.setItem('access_token', accessToken);
    // localStorage.setItem('refresh_token', refreshToken);
    // const currentTime = new Date();
    // const expireTime = new Date(currentTime.getTime() + (9 * 60 + 45) * 1000);
    // localStorage.setItem('expiresAt', expireTime.toISOString());

    // alert('로그인 성공');
    // navigate('/')
};

  

/**
 * 
 * @param {*} dis_level 
 * @param {*} email 
 * @param {*} nickname 
 * @param {*} password 
 * @returns 로그아웃 후 헤더에서 acc토큰 제거
 */
const logOut =  async() => {    
    // await instance.delete(apiURL)
    // .then(()=>{
    console.log('로그아웃 정상 완료')
        // axios 헤더의 access 토큰 제거
        // instance.defaults.headers.common['Authorization'] = undefined;
        // localStorage.removeItem('access_token');
        // localStorage.removeItem('refresh_token');
    return 'logout 완료'
    // })
    // .catch(()=>{
    //     console.log('로그아웃 실패!!!')
    //     return 'logout 실패!!!'
    // })
    // 로컬스토리지에서 access 토큰 제거
}

const register = async (email, pw) => {
    // axios를 이용하여 jwt 회원가입 요청을 보낸다.
    const apiURL = "https://b6saprgg73.execute-api.ap-northeast-2.amazonaws.com/plz/signup/"
    const requestData = {
        'email': email,
        'password': pw,
        'nickname' : email,
        'dis_level' : "1"
    }
    const finaldata = JSON.stringify(requestData)
    console.log(finaldata)
    return await axios.post(apiURL, finaldata, {
        headers: {
          'Content-Type': 'application/json', // JSON 데이터를 보내는 것을 명시
        },
        withCredentials : true

    })
    .then((res) => {
        const status = res.data.statusCode
        console.log(res)
        if (status === 200){
            alert('회원가입 성공')
            return true;

        }
        else{
            console.log(status)
            alert('회원가입 실패')
            return false
        }
        // 벡엔드에서 httponly 쿠키로 토큰들이 전송되어 로그인됨
    }).catch((error) => {
        console.log(error)
        alert('서버 응답 에러')
        // 백엔드에서 자동으로 리프레시 해주므로 구현할 필요없음
        return false;
    })
}

/**
 * 테스트용 register
 */
// const register = async (email, pw) =>{
//   const apiURL = "https://ha053hz7ib.execute-api.ap-northeast-2.amazonaws.com/test/test-resource/t"

//   const requestData = {
//             'email': email,
//             'password': pw,
//             'nickname' : email,
//             'dis_level' : "1"
//         }
//         const finaldata = JSON.stringify(requestData)
//   axios.post(apiURL, requestData)
// }
/**
 * 
 * @returns user정보를 가져오는 API
 */
const getUserAuth = async () =>{
    const apiURL = baseURL + "getDisLevel/"
    
    return await instance.get(apiURL, {withCredentials:true})
    .then((response) =>{
        return(response)
    }).catch((error) => {
        console.log(error)
        console.log('Get User Auch 실패!!')
    })
}
const updateUserAuth = async (auth) =>{
    const apiURL = baseURL + "/user/auth/update/"

    const requestData = {
        'email': auth.email,
        'dis_level': auth.dis_level,
        'password': auth.password,
        'nickname' : auth.nickname
    }

    const finaldata = JSON.stringify(requestData)
    console.log(finaldata)
    return await instance.post(
        apiURL,
        finaldata,
        {
            withCredentials: true,
        }
    ).then((response) =>{
            return(response)}
    ).catch((error) => {
        console.log(error)  
    }
    )
}
/**
 * refresh토큰을 가지고 새로운 access token을 요청 헤더에 달아주기
 * @param {*} refreshToken 
 */
const refresh = async (refreshToken) => {
    const apiURL = baseURL + "/user/auth/refresh/"
    const requestData = {
        'refresh' : localStorage.getItem('refresh_token'),
    }
    const finaldata = JSON.stringify(requestData)
    instance.post(
        apiURL,
        finaldata,
        {
            withCredentials: true,
        }
    )
    .then((response)=>{
        console.log('refresh동작후 data');
        console.log(response.data);
    })
    .catch((error)=>{
        console.log(error);
        console.log('refresh 동작 에러')
    })
}

// const refresh_interceptor = () => {
    
//     api.interceptors.response.use(
//         (response) => response,
//         async (error) => {
//           const originalRequest = error.config;

//           if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//               const response = await instance.post('/api/user/token/refresh/');

//               return api(originalRequest);
//             } catch (error) {
//               // 로그아웃
//               return Promise.reject(error);
//             }
//           }

//           return Promise.reject(error);
//         }
//       );
// }
export {login, register, refresh, getUserAuth, updateUserAuth, logOut};