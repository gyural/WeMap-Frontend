
import colors from "../../../../Common/Color";

const { kakao } = window

function initializeMap(map) {
    // 사용자의 현재 위치 가져오기
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const currentLat = position.coords.latitude;
            const currentLng = position.coords.longitude;

            // 출발지 좌표 설정
            const startLat = currentLat;
            const startLng = currentLng;

            // 도착지 좌표 설정
            const endLat = 35.1379222;
            const endLng = 129.05562775;

        // 자동차 길찾기 함수 호출
        findPath(map, startLat, startLng, endLat, endLng);
    }, function (error) {
        console.error("현재 위치를 가져오는데 실패했습니다. : ", error);
    });
    } else {
        console.error("Geolocation을 지원하지 않는 브라우저입니다.");
    }
}


function findPath(map, startLat, startLng, endLat, endLng){

    // 출발지와 도착지 좌표 설정
    const startLatLng = new kakao.maps.LatLng(startLat, startLng);
    const endLatLng = new kakao.maps.LatLng(endLat, endLng);

    const service = new kakao.maps.services.routes(map);
    service.route(
    {
        origin: startLatLng,
        destination: endLatLng,
        travelMode: kakao.maps.services.TravelMode.DRIVING
    }, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
            const path = result.routes[0].path;
            const polyline = new kakao.maps.Polyline({
            path,
            strokeWeight: 3,
            strokeColor: colors.red,
            strokeOpacity: 0.6,
            });
            polyline.setMap(map);
        } else {
            console.error('길찾기 오류 발생: ' + status);
        }
        }
    );

    // 출발지에서 도착지까지 길찾기 서비스 생성
    const polyline = new kakao.maps.Polyline({

        path : [startLatLng, endLatLng],  // 출발지와 도착지 설정
        strokeWeight : 5,  // 선의 두께 설정
        strokeColor : colors.red, // 선의 색상 설정
        strokeOpacity : 0.7, // 선의 투명도 설정
        fillColor : colors.red,  // 채우기 색상 설정
        fillOpacity : 0.4,  // 채우기 투명도 설정
    });
    polyline.setMap(map);

}

export { initializeMap, findPath };
