import { getBoundaryPoints } from "../../../../APIs/UnitConvert";
const { kakao } = window

/**
 * 
 * @param {*} sd_code 지역코드 
 * @return 폴리곤 path객체를
 */
const getPolygonPath = async (sd_code) =>{
    const boundaryList = await getBoundaryPoints(sd_code) 
    const result = []
    boundaryList.forEach(element => {
        result.push(new kakao.maps.LatLng(element[0], element[1]))
    });
    return result
}

export {getPolygonPath}