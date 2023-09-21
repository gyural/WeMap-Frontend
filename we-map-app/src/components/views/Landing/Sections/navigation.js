import axios from "axios";
import colors from "../../../../Common/Color";

const { kakao } = window;

async function getPath() {
  const REST_API_KEY = '4a58c0a9ecd928a16d7c702a025ca7c3';
  const apiURL = 'https://apis-navi.kakaomobility.com/v1/directions';

  // 현재 위치 가져오기
  let currentLat, currentLng;
  try {
    const position = await getCurrentLocation();
    currentLat = position.coords.latitude;
    currentLng = position.coords.longitude;
  } catch (error) {
    console.error("현재 위치를 가져오는데 실패했습니다. : ", error);
    return;
  }

  //임의 도착지
  const destinationLat = 36.601107352826;
  const destinationLng = 127.29651502894;

  const origin = `${currentLat}, ${currentLng}`;
  const destination = `${destinationLat}, ${destinationLng}`;

  const headers = {
    Authorization: `KakaoAK ${REST_API_KEY}`,
    'Content-Type': 'application/json'
  };

  const queryParams = new URLSearchParams({
    origin: origin,
    destination: destination
  });

  const requestUrl = `${apiURL}?${queryParams}`;

  try {
    const response = await axios.get(requestUrl, { headers: headers });

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = response.data;
    if(data.routes[0].result_msg === "길찾기 성공"){

      console.log('길찾기 성공!!!')
      const linePath = []
      data.routes[0].sections[0].roads.forEach(router =>{
        router.vertexes.forEach((vertex, index) =>{
          // 짝수일 때만 추가해야함!!
          if (index % 2 === 0) {
            linePath.push(new kakao.maps.LatLng(router.vertexes[index + 1], router.vertexes[index]));
          }
        }
      )})
      const result = {
        'duration': data.routes[0].sections[0].duration,
        'distance': data.routes[0].sections[0].distance,
        "linePath" : linePath
      }
      console.log(result)

      const map = new kakao.maps.Map(document.getElementById("map"), {
        center : new kakao.maps.LatLng(currentLat, currentLng),
        level : 3,
      });

      var polyline = new kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 3,
          strokeColor: colors.red,
          strokeOpacity: 0.7,
          strokeStyle: 'solid'
      }); 
      polyline.setMap(map);

    }else{
      console.log('길찾기 실패')
      return undefined
    }
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// 현재 위치 가져오는 함수
function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject(new Error("Geolocation을 지원하지 않는 브라우저입니다."));
    }
  });
}

export { getPath };
