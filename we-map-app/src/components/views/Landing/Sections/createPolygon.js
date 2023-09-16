import { getGeoBoundary } from "../../../../APIs/MapAPIs";
import { getBoundaryPoints } from "../../../../APIs/UnitConvert";
import colors from "../../../../Common/Color";
const { kakao } = window

/**
 * 
 * @param {*} sd_code 지역코드 
 * @return 폴리곤 path객체를
 */
const getPolygonPath = async (sd_code) =>{
    const boundaryList = await getGeoBoundary(sd_code)
    console.log('draw에서 받은 data~~~')
    
    const result = []
    let resultC = []
    boundaryList.forEach(singlePolygon =>{
        resultC = []
        singlePolygon.forEach(element => {
            resultC.push(new kakao.maps.LatLng(element[0], element[1]))
        });
        
        result.push(resultC)
    })
    return result
}

/**
     * 
     * @param {*} sd_code_List 표시할 다각형 지역코드 리스트 
     * @return 매개변수에서 받은 지역코드의 폴리곤 객체 반환
     */
const createPolygon = async (sd_code) =>{
    /**다각형 좌표 리스트 */
    var polygonPath = [];
    const pathData = await getPolygonPath(sd_code)
    pathData.forEach(singlePath => {
        polygonPath.push(singlePath)
        
    });
    console.log(polygonPath)
    // 지도에 표시할 다각형을 생성합니다
    var polygon = new kakao.maps.Polygon({
        path:polygonPath, // 그려질 다각형의 좌표 배열입니다
        strokeWeight: 1.5, // 선의 두께입니다
        strokeColor: colors.red, // 선의 색깔입니다
        strokeOpacity: 0.4, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid', // 선의 스타일입니다
        fillColor: colors.red, // 채우기 색깔입니다
        fillOpacity: 0.25, // 채우기 불투명도 입니다
    });
    
    
    return polygon
    
  }

  const drawPolygon = async(map, sdList) =>{
    sdList.forEach(async (sdcode) =>{
        const polygon = await createPolygon(sdcode)
        polygon.setMap(map)
    })
  }

export {getPolygonPath, createPolygon, drawPolygon}