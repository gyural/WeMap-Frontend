// let socketListenr = undefined

// try {
//     const socket = new WebSocket('wss://lvb2z5ix97.execute-api.ap-northeast-2.amazonaws.com/dev?token=sometoken');

//     socket.onopen = (event) => {
//         console.log('Connected:', event);
//     };

//     socket.onmessage = (event) => {
//         socketListenr = event.data
//         console.log(socketListenr)
//         // 웹 페이지에 데이터를 표시하는 로직을 추가합니다.
//     };

//     socket.onclose = (event) => {
//         console.log('Connection closed:', event);
//     };

//     socket.onerror = (error) => {
//         console.error('WebSocket Error:', error);
//     };

// } catch (error) {
//     console.log(error);
// }