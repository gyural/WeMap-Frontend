import axios from "axios";
import colors from "../../../../Common/Color";

const { kakao } = window;

const getShelter = async (currentLocation) => {
  const apiURL = "https://q59cs7kvf3.execute-api.ap-northeast-2.amazonaws.com/plz/get-shelter"
  const requestData = {
    'current_location' : currentLocation
  }
  const finaldata = JSON.stringify(requestData)
  console.log(finaldata)
  return await axios.post(apiURL, finaldata)
  .then ((res) => {
    console.log(res)
    console.log("정상출력")
    return res;
  }) .catch((error) => {
    console.log(error)
    return false;
  })
}

/**
 * 
 * @param {*} origin 
 * @param {*} destination 
 * @returns 
 */
const testCoordinate = async (origin, destination) => {
  
  const findLoadInfo = await getPath(origin, destination);
  let result = []
  findLoadInfo.linePath.forEach(element => {
      result.push(element)
    
  });
  console.log(result)
  return result
}
/**
 * 
 * @param {*} origin 
 * @param {*} destination 
 * @returns Path 반환
 */
async function getPath(origin, destination) {

  const REST_API_KEY = '4a58c0a9ecd928a16d7c702a025ca7c3';
  const apiURL = 'https://apis-navi.kakaomobility.com/v1/directions';

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
    console.log(response)

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
      return result
    }else{
      console.log('길찾기 실패')
      return undefined
    }
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

export { getShelter, getPath, testCoordinate };
