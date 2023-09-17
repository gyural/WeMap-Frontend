import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { createPolygon, getPolygonPath } from './createPolygon'
import colors from '../../../../Common/Color'
import { drawPolygon } from './createPolygon'
import pinicon from '../../../../images/pin.png';

const Container = styled.div`
    width: 100%;
    height: 100%;
`;
/**
 * 일단 더미데이터. title이름 지울까 말까..
 */
const dummyLocations = [
  { title: "학교", lat: 36.611044, lng: 127.286428 },
  { title: "Location 2", lat: 36.611291, lng: 127.357820 },
  { title: "Location 3", lat: 37.289198, lng: 127.012131 },
  { title: "이재모피자", lat: 35.102102, lng: 129.030605 },
];


const { kakao } = window;

const MapContainer = ({ searchPlace }) => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
      const socket = new WebSocket('wss://lvb2z5ix97.execute-api.ap-northeast-2.amazonaws.com/dev?token=sometoken');
      socket.onopen = (event) => {
          console.log('Connected:', event);
      };
      socket.onmessage = (event) => {
      };
      socket.onclose = (event) => {
          console.log('Connection closed:', event);
      };
      socket.onerror = (error) => {
          console.error('WebSocket Error:', error);
      };
  
      const mapContainer = document.getElementById('map');
      const mapOption = {
          center: new kakao.maps.LatLng(36.498649, 127.268141),
          level: 7
      };
  
      const map = new kakao.maps.Map(mapContainer, mapOption);
  
      const imageSrc =pinicon;
      const imageSize = new kakao.maps.Size(50, 50);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
  
      dummyLocations.forEach(location => {
        const markerPosition = new kakao.maps.LatLng(location.lat, location.lng);
        
        const marker = new kakao.maps.Marker({
            map: map,
            position: markerPosition,
            image: markerImage
        });
        
        const overlayPosition = new kakao.maps.LatLng(location.lat, location.lng);
        
        const customOverlay = new kakao.maps.CustomOverlay({
            position: overlayPosition,
            content: `<div>${location.title}</div>`,
            yAnchor: 1.5  
        });
        
        let isOverlayShown = false;  
        // 마커에 클릭 이벤트 설정
        kakao.maps.event.addListener(marker, 'click', function() {
          if (isOverlayShown) {
              customOverlay.setMap(null);  // 오버레이 숨기기
          } else {
              customOverlay.setMap(map);   // 오버레이 보여주기
          }
  
          isOverlayShown = !isOverlayShown;  // 상태 토글
      });
  
    
        // 기본적으로 커스텀 오버레이는 숨김 상태
        customOverlay.setMap(null);
    });
  
      const sd_list = [11040, 39010, 38];
      drawPolygon(map, sd_list);
  
  }, [searchPlace, locations]);
  
  

    return (
        <Container>
            <div id="map" style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
            }}>
            </div>
        </Container>
    );
}

export default MapContainer;
