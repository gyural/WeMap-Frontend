import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createPolygon, getPolygonPath } from './createPolygon';
import colors from '../../../../Common/Color';
import { drawPolygon } from './createPolygon';
// import { FindLoad } from './FindLoad';
import pinicon from '../../../../images/pin.png';
import backarrow from "../../../../images/left-arrow.png";
import typhoon from "../../../../images/hurricane.png";
import forestFire from "../../../../images/forest-fire.png";
import landslide from "../../../../images/landslide.png";
import flood from "../../../../images/flood.png";
import heavyRain from "../../../../images/heavy-rain.png";
import hot from "../../../../images/hot.png";
import fog from "../../../../images/fog.png";
import heavySnow from "../../../../images/heavy-snow.png";
import earthquake from "../../../../images/earthquake.png";
import tsunami from "../../../../images/tsunami.png";
import yellowDust from "../../../../images/yellow-dust.png";
import fire from "../../../../images/fire.png";
import carAccident from "../../../../images/accident.png";
import missing from "../../../../images/missing.png";

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const disasterTypeToImage = {
    "태풍": typhoon,
    "산불": forestFire,
    "산사태": landslide,
    "홍수": flood,
    "호우": heavyRain,
    "폭염": hot,
    "안개": fog,
    "대설": heavySnow,
    "지진": earthquake,
    "해일": tsunami,
    "황사": yellowDust,
    "화재": fire,
    "교통사고": carAccident,
    "실종": missing,
  };

/**
 * 일단 더미데이터. title이름 지울까 말까..
 */
const dummyLocations = [
    { disasterTypeToImage: "폭염", lat: 36.611044, lng: 127.286428, title: "Location 1" },
    { disasterTypeToImage: "태풍", lat: 36.611291, lng: 127.357820, title: "Location 2" },
    { disasterTypeToImage: "산불", lat: 37.289198, lng: 127.012131, title: "Location 3" },
    { disasterTypeToImage: "화재", lat: 35.102102, lng: 129.030605, title: "이재모피자" },
  ];
  

const { kakao } = window;

const MapContainer = ({ searchPlace }) => {
    console.log('first')
    const [locations, setLocations] = useState([]);
    const [socketListenr, setSocketListenr] = useState([])
  
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
        websocket.close();
      };
    }, []);

    useEffect(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
          center: new kakao.maps.LatLng(36.498649, 127.268141),
          level: 5
      };
  
      const map = new kakao.maps.Map(mapContainer, mapOption);
  
     
  
      dummyLocations.forEach(loc => {
        const markerPosition = new kakao.maps.LatLng(loc.lat, loc.lng);
        const imageSrc = disasterTypeToImage[loc.disasterTypeToImage];   // 매핑된 이미지 가져오기
        const imageSize = new kakao.maps.Size(50, 50);
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    
        
        const marker = new kakao.maps.Marker({
            map: map,
            position: markerPosition,
            image: markerImage
        });
        
        const overlayPosition = new kakao.maps.LatLng(loc.lat, loc.lng);
        
        const customOverlay = new kakao.maps.CustomOverlay({
            position: overlayPosition,
            content: `<div>${loc.title}</div>`,
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
  
      /**
     * 다각형지도 Drawing
     */
    console.log(socketListenr)
    if(socketListenr){
      const sd_list = []
      socketListenr.forEach(element => {
        sd_list.push(Number(element.location_id))
      });
      console.log(sd_list)
      drawPolygon(map, sd_list)

    }
  
  }, [searchPlace, locations, socketListenr]);

  /**
   * 길찾기 Drawing
   * */ 

  // useEffect(() => {
    
  //   // 카카오맵 API 스크립트 로드
  //   const script = document.createElement('script');
  //   script.async = true;
  //   script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=c8ba7cea409e1f8394813ce600152839&libraries=services,drawing`;
  //   script.onload = () => {
  //     // API 스크립트가 로드된 후에 실행될 콜백 함수
  //     kakao.maps.load(() => {
  //       // 카카오맵 API 초기화
  //       const mapContainer = document.getElementById('map');
  //       const mapOption = {
  //           center: new kakao.maps.LatLng(36.498649, 127.268141),
  //           level: 5
  //       };
  //       const map = new kakao.maps.Map(mapContainer, mapOption);
  //     });
  //   };
  //   document.head.appendChild(script);

  //   return () => {
  //     // 컴포넌트 언마운트 시 스크립트 제거
  //     document.head.removeChild(script);
  //   };
  // }, []);

  // // 출발지와 도착지 좌표 설정
  // const startLatLng = new kakao.maps.LatLng(36.610261563595, 127.29307759409);
  // const endLatLng = new kakao.maps.LatLng(36.601107352826, 127.29651502894);

  // useEffect(() => {

  //   if(Container) {
  //     kakao.maps.load(() => {
  //       // 출발지에서 도착지까지 길찾기 서비스 생성
  //       const drawingManager = new kakao.maps.services.Drawing({
  //       map : Container,
  //       path : [startLatLng, endLatLng],  // 출발지와 도착지 설정
  //       strokeWeight : 3,  // 선의 두께 설정
  //       strokeColor : 'red', // 선의 색상 설정
  //       strokeOpacity : 0.6, // 선의 투명도 설정
  //       fillColor : 'red',  // 채우기 색상 설정
  //       fillOpacity : 0.4,  // 채우기 투명도 설정
  //       });

  //       drawingManager.route({
  //         start : startLatLng,
  //         end : endLatLng,
  //         searchOptions : ['tmc', 'traopt', 'spas']
  //     }, function (result, status) {
  //         if (status === kakao.maps.services.Status.OK) {
  //             var path = result.path;
  //             var distance = result.distance;
  //             console.log('총 거리 : ' + distance + 'm' );
  //             var polyline = new kakao.maps.Polyline({
  //                 path : path,
  //                 strokeWeight : 3,  
  //                 strokeColor : 'red', 
  //                 strokeOpacity : 0.6,
  //                 fillColor : 'red', 
  //                 fillOpacity : 0.4,
  //             });
  //             polyline.setMap(Container);
  //         } else {
  //             console.log('길찾기 오류 발생 : ' + status);
  //         }
  //     });

  //     })
  //   }
  // }, [Container]);

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
};

export default MapContainer;
