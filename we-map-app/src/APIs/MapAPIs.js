/**
 * Map APIs
 */
import axios from "axios"
import { utmToCentral } from "./UnitConvert"
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
          consumer_key: process.env.REACT_APP_MAP_CLIENT_ID,
          consumer_secret: process.env.REACT_APP_MAP_SECRET_ID
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
/**
 * 
 * @param {*} geoCode 행정동 코드
 * @returns SGIS단위 다각형 꼭짓점 좌표
 */
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
          const data = res.data
          if (data.features[0].geometry.type == "MultiPolygon"){
            // multipoligon좌표임
          const multibound =  data.features[0].geometry.coordinates
          /**
           * 최종적으로 반환되는 PolygonPath 2차원 or 1차원
           */
          const result = []
          multibound.forEach((element) => {
            const multiChild = element[0]
            const resultChild = []
            for (const v of multiChild) {
              const converted =  utmToCentral(v[0], v[1]);
              resultChild.push(converted);
            }
            result.push(resultChild)
          });
          return result
            
          }
          console.log('singl 좌표')
          const vertex = data.features[0].geometry.coordinates[0]
          const resultList = [[]]
          for (const v of vertex) {
            const converted =  utmToCentral(v[0], v[1]);
            resultList[0].push(converted);
          }
          return resultList

        })
        .catch((error) => {
          console.log('등록되지 않은 행정코드')
          console.log(requstData.adm_cd)
          console.error(error);
          return []
        });
}

export {getAccess, getGeoBoundary}
