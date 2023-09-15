/**
 * Map APIs
 */
import axios from "axios"
let accessToken = undefined
let accessExpire = undefined

const MapAPI = axios.create(
   { headers: {
        'Content-Type': 'application/json',
      },}
      )
/**
 * 배포용 주소
 */
// const baseURL = "https://sgisapi.kostat.go.kr/OpenAPI3/"

/**
 * 개발용 프록시 주소
 */
const baseURL = "/OpenAPI3"

const getAccess = async () => {
    const apiURL = baseURL + "/auth/authentication.json";
  
    try {
      const response = await MapAPI.get(apiURL, {
        params: {
          consumer_key: "86516bd75bf444caaf92",
          consumer_secret: "285b6a243e914068afb6"
        }
      });
  
      const data = response.data;
      accessToken = data.result.accessToken;
      accessExpire = data.result.accessTimeout;
    } catch (error) {
      console.error(error);
    }
  };
  
  
const mapRefresh = async () =>{
    const currentTimeInMilliseconds = Date.now(); // 현재 시간을 밀리초 단위로 얻기
    const currentTimeInSeconds = Math.floor(currentTimeInMilliseconds / 1000); // 밀리초를 초로 변환하기

    if (accessToken){
        if (currentTimeInSeconds > Number(accessExpire)){
            await getAccess()
        }
    }
    else{
        await getAccess()
    }

}
/**
 * 
 * @param {*} geoCode : 행정구역 코드
 */

// 프록시용 주소
// const baseURL = "/OpenAPI3/boundary/hadmarea.geojson"

const getGeoBoundary = async (geoCode) =>{
    await mapRefresh()
    const apiURL = baseURL + "/boundary/hadmarea.geojson"
    const requstData = {
        accessToken : accessToken,  
        year : 2022,
        adm_cd :  geoCode,
        low_search :  0,
    }

     return await MapAPI.get(apiURL, {
        params: requstData
      })
        .then((res) => {
          console.log(res.data.result);
          const data = res.data
          return data.features[0].geometry.coordinates[0]
        })
        .catch((error) => {
          console.error(error);
        });
}

const convertUnits = (target) =>{
    const srcUnit = 5179
    const destUnit = 5181
    const apiURL = baseURL + "/transformation/transcoord.json"
    

}
export {getAccess, getGeoBoundary}