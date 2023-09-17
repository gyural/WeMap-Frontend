import React, { useState } from 'react';
import styled from 'styled-components';

import backarrow from "../../../../images/left-arrow.png";

import MapContainer from './MapContainer';
import '../../styles.css';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction :column;
    align-items: center;
`;

const Topbar = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Image = styled.img`
    width: 20px;
    height: 20px;
`;

const BackArrow = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    width: 20px;
    height: 20px;
`;

function FindLoad(){

    const [Place, setPlace] = useState('');

//     // 출발지와 도착지 좌표를 설정합니다.
//     const startLatLng = new kakao.maps.LatLng(36.610261563595, 127.29307759409);
//     const endLatLng = new kakao.maps.LatLng(36.601107352826, 127.29651502894);

//     // 길찾기 서비스를 생성합니다.
//     const drawingManager = new kakao.maps.services.Drawing(map, {
//         map: map,
//         path: [startLatLng, endLatLng], // 출발지와 도착지 설정
//         strokeWeight: 3, // 선의 두께 설정
//         strokeColor: 'red', // 선의 색상 설정
//         strokeOpacity: 0.6, // 선의 투명도 설정
//         fillColor: 'red', // 채우기 색상 설정
//         fillOpacity: 0.4 // 채우기 투명도 설정
//     });

//     // 길찾기 결과를 지도에 표시합니다.
//     drawingManager.route({
//         start: startLatLng,
//         end: endLatLng,
//         searchOptions: ['tmc', 'traopt', 'spas']
//     }, function (result, status) {
//         if (status === kakao.maps.services.Status.OK) {
//             var path = result.path;
//             var distance = result.distance;
//             console.log('총 거리: ' + distance + 'm');
//             var polyline = new kakao.maps.Polyline({
//                 path: path,
//                 strokeWeight: 3,
//                 strokeColor: 'red',
//                 strokeOpacity: 0.6,
//                 fillColor: 'red',
//                 fillOpacity: 0.4
//             });
//             polyline.setMap(map);
//         } else {
//             console.error('길찾기 오류 발생: ' + status);
//         }
//     });

    return (
        <Container>
            <Topbar>
                <BackArrow>
                    <Image src={backarrow} alt="뒤로가기 버튼"></Image>
                </BackArrow>
            </Topbar>
            <div className="mapContainer"style={{ width: '100%', height: '100%' }}>
                <MapContainer searchPlace={Place} />
            </div>
        </Container>
    )

}

export default FindLoad;
