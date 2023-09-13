/**
 * 개발환경에서 CORS 에러를 피하기 위한 프록시 설정 함수 입니다.
 */

const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * 모든 /api가 baseURL인 요청에 대해여
 * '로컬 baseURL /api 이전을'
 * target의 value값으로 대체하여 데이터 요청을 해줍니다!!!
 * @param {*} app 
 */
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      /**
       * 배포주소를 target
       */
      // target: 'https://server.ja-doctor.net',   
      // /**
      //  * 파이참 서버 주소로 target
      //  */
      target: 'http://127.0.0.1:8000',
      secure: false,
      changeOrigin: true,
    }),
  );


};
