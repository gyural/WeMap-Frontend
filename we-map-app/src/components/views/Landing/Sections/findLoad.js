
import colors from "../../../../Common/Color";
import MapContainer from "./MapContainer";
import { testCoordinate, getPath, getShelter } from "./navigation";

const { kakao } = window

const findPath = async (map, origin, destination, position) => {
    const data = await getShelter(position)
    console.log(origin)
    const shelterList = data.data.body
    console.log('getShelter 반환값!!!')
    console.log(shelterList)
    const result = await testCoordinate(origin, `${shelterList[1].Longitude}, ${shelterList[1].Latitude}`)
    // 출발지에서 도착지까지 길찾기 서비스 생성
    const path = result;
    const polyline = new kakao.maps.Polyline({

        path : result,  // 출발지와 도착지 설정
        strokeWeight : 5,  // 선의 두께 설정
        strokeColor : colors.mainBlue, // 선의 색상 설정
        strokeOpacity : 0.7, // 선의 투명도 설정
        fillColor : colors.mainBlue,  // 채우기 색상 설정
        fillOpacity : 0.4,  // 채우기 투명도 설정
    });

    polyline.setMap(map);

}

export { findPath };

