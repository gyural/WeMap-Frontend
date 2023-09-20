import axios from 'axios';

/**
 * 항상 모든 API 요청은 해당 Instatnce를 사용합니다.
 * 로그인이 된 instance는 헤더에 인증이된 acc 토큰을 가지고 있습니다.
 */
const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // withCredentials 옵션 추가
});



export default instance;