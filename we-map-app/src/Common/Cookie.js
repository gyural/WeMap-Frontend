// import { Cookies } from 'react-cookie';

// const cookies = new Cookies();

// export const setRefreshToken = (refreshToken) => {
//     const today = new Date();
//     const expireDate = today.setDate(today.getDate() + 7);

//     return cookies.set('refresh', refreshToken, { 
//         sameSite: 'strict', 
//         path: "/", 
//         expires: new Date(expireDate)
//     });
// };

// export const setaccessToken = (accessToken) => {
//     const today = new Date();
//     const expireDate = today.setDate(today.getDate() + 7);

//     return cookies.set('access', accessToken, { 
//         sameSite: 'strict', 
//         path: "/", 
//         expires: new Date(expireDate)
//     });
// };
// /**
//  * 
//  * @returns refresh토큰 반환
//  */
// export const getCookieToken = () => {
//     return cookies.get('refresh');
// };
// /**
//  * 
//  * @returns acces토큰 반환
//  */
// export const getaccessToken = () => {
//     return cookies.get('access');
// };
// export const removeCookieToken = () => {
//     return cookies.remove('refresh', { sameSite: 'strict', path: "/" })
// }

// export {cookies}
