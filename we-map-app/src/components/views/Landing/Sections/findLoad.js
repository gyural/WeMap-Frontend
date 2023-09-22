
import colors from "../../../../Common/Color";
import MapContainer from "./MapContainer";
import { testCoordinate, getPath, getShelter } from "./navigation";

const { kakao } = window

const findPath = async (map, origin, destination) => {
    const result = await testCoordinate(`${origin[0]}, ${origin[1]}`, `${destination[1]}, ${destination[0]}`)
    console.log(result)    
    console.log(result.linePath)    
    // 출발지에서 도착지까지 길찾기 서비스 생성
    const polyline = new kakao.maps.Polyline({

        path : result.linePath,  // 출발지와 도착지 설정
        strokeWeight : 5,  // 선의 두께 설정
        strokeColor : colors.mainBlue, // 선의 색상 설정
        strokeOpacity : 0.7, // 선의 투명도 설정
        fillColor : colors.mainBlue,  // 채우기 색상 설정
        fillOpacity : 0.4,  // 채우기 투명도 설정
    });

    polyline.setMap(map);
    return [result.duration, result.distance]
}

export { findPath };

