import React, { useState } from 'react';
import styled from 'styled-components';

const { kakao } = window

      // 출발지와 도착지 마커 표시
      // const startMarker = new kakao.maps.Marker ({
      //   map : map,
      //   position : startLatLng,
      //   image : markerImage,
      // });

      // const getElementByIdMarker = new kakao.maps.Marker ({
      //   map : map,
      //   position : endLatLng,
      //   image : markerImage,
      // });

      // 길찾기 서비스 사용
//       const ps = new kakao.maps.services.Places();
//       ps.keywordSearch('출발지 키워드', (startPlaces, status) => {
//         if (status === kakao.maps.services.Status.OK) {
//           const startPlace = startPlaces[0];
//           ps.keywordSearch('도착지 키워드', (endPlaces, status) => {
//             if (status === kakao.maps.services.Status.OK) {
//               const endPlace = endPlaces[0];

//               // 출발지와 도착지 객체로 지정
//               const startLatLng = new kakao.maps.LatLng(36.610261563595, 127.29307759409);
//               const endLatLng = new kakao.maps.LatLng(36.601107352826, 127.29651502894);

//               // 길찾기 객체 생성
//               const service = new kakao.maps.services.Routes();
//               service.route({
//                 origin: startLatLng,
//                 destination: endLatLng,
//                 travelMode: kakao.maps.services.TravelMode.WALKING
//               }, (result, status) => {
//                 if (status === kakao.maps.services.Status.OK) {
//                   const path = result.routes[0].section[0].polyline;
//                   const polyline = new kakao.maps.Polyline({
//                     path: kakao.maps.geometry.encoding.decodePath(path),
//                     strokeWeight: 3,
//                     strokeColor: 'red',
//                     strokeOpacity: 0.6
//                   });
//                   polyline.setMap(map);
//                 } else {
//                   console.error('길찾기 오류 발생: ' + status);
//                 }
//               });
//             }
//           });
//         }
//       });
//     }
// }, [map]);

function findPath(map, startLat, startLng, endLat, endLng){
    // 출발지와 도착지 좌표 설정
    const startLatLng = new kakao.maps.LatLng(startLat, startLng);
    const endLatLng = new kakao.maps.LatLng(endLat, endLng);

    // const service = new kakao.maps.services.Route();
    // service.route(
    // {
    //     origin: startLatLng,
    //     destination: endLatLng,
    //     travelMode: kakao.maps.services.TravelMode.WALKING
    // }, (result, status) => {
    //     if (status === kakao.maps.services.Status.OK) {
    //         const path = result.routes[0].section[0].polyline;
    //         const polyline = new kakao.maps.Polyline({
    //         path: kakao.maps.geometry.encoding.decodePath(path),
    //         strokeWeight: 3,
    //         strokeColor: 'red',
    //         strokeOpacity: 0.6
    //         });
    //         polyline.setMap(map);
    //     } else {
    //         console.error('길찾기 오류 발생: ' + status);
    //     }
    //     }
    // );

      // 출발지에서 도착지까지 길찾기 서비스 생성
    const polyline = new kakao.maps.Polyline({

        path : [startLatLng, endLatLng],  // 출발지와 도착지 설정
        strokeWeight : 3,  // 선의 두께 설정
        strokeColor : 'red', // 선의 색상 설정
        strokeOpacity : 0.6, // 선의 투명도 설정
        fillColor : 'red',  // 채우기 색상 설정
        fillOpacity : 0.4,  // 채우기 투명도 설정
    });
    polyline.setMap(map);
    console.log(polyline);

}

export { findPath };
