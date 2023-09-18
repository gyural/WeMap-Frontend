import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createPolygon, getPolygonPath } from './createPolygon';
import colors from '../../../../Common/Color';
import { drawPolygon } from './createPolygon';
import { insertManualCard } from './manualCard';
import pinicon from '../../../../images/pin.png';
// import FindLoad from './FindLoad';


/**Map Container를 감싸는 최종 부모 컴포넌트 */
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

    //socket에 대이터가 바뀔때마다 socketListener가 바뀜
    const [socketListenr, setSocketListenr] = useState([])
    
    //zoom이 바뀔때마다 리랜더링을 통해서 보이게할 지도 컨텐츠를 조절하기 위함
    const [zoom, setZoom] = useState(undefined)
    
    /**
     * MapCotainer가 마운트 / 언마운트 될때만 작동한는 Hook
     * 1) 웹소캣의 함수들의 정의 2) 웹소캣 connect / disconnect를 다룸
     */
    useEffect(() => {
      // WebSocket 연결 생성
      const websocket = new WebSocket("wss://lvb2z5ix97.execute-api.ap-northeast-2.amazonaws.com/dev?token=sometoken");
      websocket.onopen = () => {
        console.log("Connected to the WebSocket");
        // 연결이 수립되면 메시지 전송
        websocket.send(JSON.stringify({ action: "onData" }));
      };
      websocket.onmessage = (event) => {
        console.log("Received message:", event.data);
        // 수신한 데이터를 state에 저장
        setSocketListenr(JSON.parse((event.data)));
      };
      websocket.onerror = (error) => {
        console.error("WebSocket Error:", error);
      };
      websocket.onclose = (event) => {
        if (event.wasClean) {
          console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
        } else {
          console.error("Connection died");
        }
      };
      // 컴포넌트 언마운트 시 연결 종료
      return () => {
        console.log('언마운트 후 disconnected')
        websocket.close();
      };
    }, []);


    useEffect(() => {

      //카카오 맵 객체 만들어 주기
      const mapContainer = document.getElementById('map');
      const mapOption = {
          center: new kakao.maps.LatLng(37.541, 126.986),
          level: 7
      };
      const map = new kakao.maps.Map(mapContainer, mapOption);
      
      //소캣으로 들어온 데이터로 map 객체에 다각형지도 Drawing
      console.log(socketListenr)
      if(socketListenr){
        const sd_list = []
        socketListenr.forEach(element => {
          sd_list.push(Number(element.location_code))
        });
        drawPolygon(map, sd_list)
      }

      //zomm이 바뀔때 마다 메뉴얼카드 추가 / 삭제
      kakao.maps.event.addListener(map, 'zoom_changed', function() {
        var level = map.getLevel();
        console.log('zoom Changed')
        console.log(level)
        if (level < 9){
          insertManualCard(map)
        }
        setZoom(level)
      })
      
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
  
  }, [searchPlace, locations, socketListenr]);
  

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
