import axios from "axios"
import instance from "./Instance";
import { getCookieToken, getaccessToken, setRefreshToken, setaccessToken } from "../Common/Cookie";
import { cookies } from "../Common/Cookie";
/**
 * 로컬에서 사용하는 baseURL
 */
const baseURL = '/api'

// /**
//  * 배포버전에서 사용하는 baseURL
//  */
// const baseURL = 'https://server.ja-doctor.net/api'


/**
 * 로그인 성공시 로컬 스토리지에 acc/rfc 토큰 담아주기
 * @param {*} email 
 * @param {*} pw 
 * @returns 로그인 성공/실패 여부로 비동기 적으로 true/false 반환
 *  
 */
const login = async (email, pw) => {
    // axios를 이용하여 jwt 로그인 요청을 보낸다.
    const apiURL = baseURL + '/user/auth/'
    const requestData = {
        'email': email,
        'password': pw
    }
    const finaldata = JSON.stringify(requestData)
    // console.log(finaldata)
    return await axios.post(apiURL, finaldata, {headers: {
        'Content-Type': 'application/json',
      }})
    .then((response) => {
        console.log(response)
        const accessToken = response.data.token.access;
        const refreshToken = response.data.token.refresh;
        console.log('쿠키 get')
        
        instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        const currentTime = new Date();
        const expireTime = new Date(currentTime.getTime() + (9 * 60 + 45) * 1000);
        // expireTime 값을 ISO 문자열로 변환하여 localStorage에 저장
        localStorage.setItem('expiresAt', expireTime.toISOString());
        alert('로그인 성공');
        // 벡엔드에서 httponly 쿠키로 토큰들이 전송되어 로그인됨
        // navigate('/')
    }).catch((error) => {
        console.log(error);
        alert('로그인 실패');
        throw error;
    })
}

/**
 * 
 * @param {*} dis_level 
 * @param {*} email 
 * @param {*} nickname 
 * @param {*} password 
 * @returns 로그아웃 후 헤더에서 acc토큰 제거
 */
const logOut =  async() => {
    const apiURL = baseURL + '/user/auth/'
    
    await instance.delete(apiURL)
    .then(()=>{
        console.log('로그아웃 정상 완료')
        // axios 헤더의 access 토큰 제거
        instance.defaults.headers.common['Authorization'] = undefined;
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return 'logout 완료'
    })
    .catch(()=>{
        console.log('로그아웃 실패!!!')
        return 'logout 실패!!!'
    })
    // 로컬스토리지에서 access 토큰 제거
}

const register = (email, pw) => {
    // axios를 이용하여 jwt 회원가입 요청을 보낸다.
    const apiURL = baseURL + '/user/register/'
    const requestData = {
        'email': email,
        'password': pw,
        'nickname' : email,
        'dis_level' : 1
    }
    const finaldata = JSON.stringify(requestData)
    console.log(finaldata)
    return axios.post(apiURL, finaldata, {
        headers: {
          'Content-Type': 'application/json', // JSON 데이터를 보내는 것을 명시
        },
      })
    .then(() => {
        alert('회원가입 성공')
        return true;
        // 벡엔드에서 httponly 쿠키로 토큰들이 전송되어 로그인됨
    }).catch((error) => {
        console.log(error)
        // 백엔드에서 자동으로 리프레시 해주므로 구현할 필요없음
        alert('회원가입 실패');
        return false;
    })
}
/**
 * 
 * @returns user정보를 가져오는 API
 */
const getUserAuth = async () =>{
    const apiURL = baseURL + "/user/auth/"
    
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
    return await instance.put(
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