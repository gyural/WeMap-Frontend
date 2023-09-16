import proj4 from "proj4"
import { getGeoBoundary } from "./MapAPIs"


const utmToCentral = (coord_X, coord_Y) =>{
proj4.defs([
  [
      'EPSG:5179',
      '+title=EPSG 5179 (long/lat) +proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs']
  , 
  [
      'EPSG:4326',
      '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees']
  ,
  [
    "EPSG:5181",
    "+title=EPSG 5179 (long/lat) +proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs"//카카오API 좌표계
  ]
    
])
  try{
    var result = proj4('EPSG:5179', 'EPSG:4326', [coord_X, coord_Y])

    return([result[1], result[0]])

  }
  catch{
    alert('단위변환 에러')
  
  }
}
/**
 * 
 * @param {*} locationCode 지역코드 
 * @returns 해당 위경도 값 (카카오 지도 단위)의 다각형 꼭짓점 리스트
 */
const getBoundaryPoints = async (locationCode) =>{
  const vertex = await getGeoBoundary(locationCode)
  const resultList = [];
  
  for (const v of vertex) {
    const converted = utmToCentral(v[0], v[1]);
    resultList.push(converted);
  }

  return resultList
}

export {getBoundaryPoints, utmToCentral}