import React, { useState } from 'react';
import styled from 'styled-components';

import backarrow from "../../../../images/left-arrow.png";

import MapContainer from './MapContainer';
import '../../styles.css';

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const { kakao } = window

export function FindLoad() {

    const [Place, setPlace] = useState('');

    const container = document.getElementById('myMap')
    const options = {
        center: new kakao.maps.LatLng(36.610261563595, 127.29307759409),
        level: 5,
    }
    const map = new kakao.maps.Map(container, options)

    // 출발지와 도착지 좌표 설정
    const startLatLng = new kakao.maps.LatLng(36.610261563595, 127.29307759409);
    const endLatLng = new kakao.maps.LatLng(36.601107352826, 127.29651502894);

    console.log('시작위치 : ' + startLatLng);
    console.log('끝위치 : ' + endLatLng);

    // 출발지와 도착지 마커 생성
    const startMarker = new kakao.maps.Marker({ position : startLatLng });
    const endMarker = new kakao.maps.Marker({ position : endLatLng });

    // 출발지와 도착지 마커를 지도에 표시
    startMarker.setMap(container);
    endMarker.setMap(container);

    // 출발지에서 도착지까지 길찾기 서비스 생성
    const drawingManager = new kakao.maps.services.Drawing(container, {
        map : container,
        path : [startLatLng, endLatLng],  // 출발지와 도착지 설정
        strokeWeight : 3,  // 선의 두께 설정
        strokeColor : 'red', // 선의 색상 설정
        strokeOpacity : 0.6, // 선의 투명도 설정
        fillColor : 'red',  // 채우기 색상 설정
        fillOpacity : 0.4,  // 채우기 투명도 설정
    });

    drawingManager.route({
        start : startLatLng,
        end : endLatLng,
        searchOptions : ['tmc', 'traopt', 'spas']
    }, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var path = result.path;
            var distance = result.distance;
            console.log('총 거리 : ' + distance + 'm' );
            var polyline = new kakao.maps.Polyline({
                path : path,
                strokeWeight : 3,  
                strokeColor : 'red', 
                strokeOpacity : 0.6,
                fillColor : 'red', 
                fillOpacity : 0.4,
            });
            polyline.setMap(container);
        } else {
            console.log('길찾기 오류 발생 : ' + status);
        }
    });

    return (
        <Container>
            <div
                id="myMap"
                style={{
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    width: '100%', 
                    height: '100%', 
                }}>
            </div>

            <div className="mapContainer"style={{ width: '100%', height: '100%' }}>
                <MapContainer searchPlace={Place} />
            </div>

        </Container>
    )

}

