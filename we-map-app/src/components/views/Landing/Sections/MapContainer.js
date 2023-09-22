/* global kakao */

import React, { useEffect, useState } from 'react';
import axios from "axios";
import styled, { createGlobalStyle } from 'styled-components';
import { createPolygon, erasePolygon, getPolygonPath, makePolygon } from './createPolygon';
import colors from '../../../../Common/Color';
import { drawPolygon } from './createPolygon';
import { getDisasterList } from './DisasterList';
import { getPath, testCoordinate } from './navigation';
import { findPath } from './findLoad';
import { drawMarkerList, eraseMarkerList, getMarkerList } from './createMarker';
import LocationSelector from "../Sections/LocationSelector";
import FindShelter from './FindShelter';
import { getShelter } from './navigation';
// import LocationSelector from "../Sections/LocationSelector";
import Modal from 'react-modal';
// 이미지 import
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
import user from "../../../../images/user.png";
import FindShelterBtn from './FindShelterBtn';




/**Map Container를 감싸는 최종 부모 컴포넌트 */
const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;
const { kakao } = window;
Modal.defaultStyles = {};
const MapContainer = ({ searchPlace }) => {

    const [popupOpen, setpopupOpen] = useState(false)
    const [popupInfo, setPopupInfo] = useState({
      "disasterType": "지진",
      "content": "- 가정 내라디오·TV·인터넷을 통해 기상예보 및 호우상황을 잘알아두세요. 응급약품·손전등·식수·비상식량 등의 생필품은 미리준비하세요. 지붕이나 벽의 틈새로 빗물이 새는 곳이 있는지 점검하고 보수하세요. 가정과 집 주변의 배수구·빗물받이 등을 점검하고, 막힌 곳을 뚫어주세요. 빗물받이의 덮개를 제거하고, 주변을 청소해주세요. 집중 호우 시 빗물받이가 막혀있으면, 배수기능이 안되어 도로나주택에 침수가 발생할 수 있습니다. 하천에 주차된 자동차는 안전한 곳으로 이동하고, 침수가 예상되는 건물의 지하공간에는 주차하지 마세요. - 외출중 외출 중 홍수로 밀려온 물은 기름이나 오수로 오염되었을 경우가 많으니 물이 빠져나갈 때 멀리 떨어지세요. 홍수로 밀려온 물에 몸이 젖은 경우 비누를 이용해 깨끗이 씻으세요. 흐르는 물에서는 약 15cm 깊이의 물에도 휩쓸려 갈수 있으니 주의하세요. 재난발생 지역, 홍수가 지나가 약화되어 붕괴 위험이 있는 제방 근처 및 도로에는 가까이 가지 마세요. 파손된 상하수도나 도로가 있다면 구청이나 동 주민센터에 신고하세요. 가로등과 신호등, 바닥에 떨어진 전선과 맨홀뚜껑은 감전의 위험이 있으니 주의하세요. 넘어진 전주·가로등 등 파손된 전기시설물에는 절대 접근하지 말고 한국전력(국번 없이 123)에 신고하세요."
    });
    
    const [map, setMap] = useState(undefined);
    const [polygonList, setPolygonList] = useState([])
    const [markerList, setMarkerList] = useState([])
    const [locations, setLocations] = useState([]);
    const [disasteList , setDisasterList] = useState([])
    const [zoom, setZoom] = useState(undefined)
    // 사용자 현재위치 state 관리
    const [currentPosition, setCurrentPosition] = useState(undefined)
    /**
     * 기존의 폴리곤을 지우고 새로운폴리곤을 그리는 함수
     */
    const renewPolygon = async (sd_list) =>{
      //기존 polygon지우기
      erasePolygon(polygonList, map)
      const newPolygonList = await makePolygon(sd_list)
      drawPolygon(newPolygonList, map)
      setPolygonList(newPolygonList)
    }
    /**
     * 메뉴얼 팝업 핸들링 함수
     */
    const handlePopUp = () =>{
      setpopupOpen(!popupOpen)
    }
    const insertMarkerList = (disasteList) => {
      if (map) {
        const markerList = getMarkerList(disasteList, map, setpopupOpen, setPopupInfo);
        if (markerList) {
          markerList.forEach(marker => {
            marker.setMap(null)
          });
          return markerList
        }
        else{
          return []
        }
          
        }
      else {
        return [];
      }
    };
    
    const handleLocationSelect = (location) => {
      // 예제 좌표 데이터 (실제로는 total_code_revised.xlsx에서 가져오기.)
      const coordinates = {
        "서울특별서 서대문구 천연동": { lat: 37.57246803097317, lon:126.95456868160035 }
        // ... 기타 도시 좌표 ...
      };
  
      const loc = coordinates[location];
      if (loc && map) {
        const locPosition = new kakao.maps.LatLng(loc.lat, loc.lon);
        map.setCenter(locPosition);
      }
    };
   
  
  useEffect(() => {
      const mapContainer = document.getElementById('map');
  
      const mapOption = {
          center: new kakao.maps.LatLng(33.450701, 126.570667), // default center
          level: 14
      };
  
      const map = new kakao.maps.Map(mapContainer, mapOption);
      
      // Set user's current location on the map
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              function (position) {
                  var lat = position.coords.latitude,
                      lon = position.coords.longitude;
                  setCurrentPosition([lon, lat])

                  var locPosition = new kakao.maps.LatLng(lat, lon);
                  map.setCenter(locPosition); // 지도의 중심을 현재 위치로 설정

                  // 현재 위치에 마커 찍기
                  const userMarkerImage = new kakao.maps.MarkerImage(user, new kakao.maps.Size(50, 50));
                  const userMarker = new kakao.maps.Marker({
                      map: map,
                      position: locPosition,
                      image: userMarkerImage
                  });
              },
              function (error) { // 위치 정보를 얻어오기 실패했을 때의 처리
                  alert("위치 파악을 실패하였습니다");
                  var defaultPosition = new kakao.maps.LatLng(33.450701, 126.570667);
                  map.setCenter(defaultPosition); // 지도의 중심을 기본 위치로 설정
              }
          );
      } else {
          map.setCenter(mapOption.center);
      }
      setMap(map)
      
      // Establish WebSocket connection
      const websocket = new WebSocket("wss://lvb2z5ix97.execute-api.ap-northeast-2.amazonaws.com/dev?token=sometoken");
      
      websocket.onopen = () => {
          console.log("Connected to the WebSocket");
          websocket.send(JSON.stringify({ action: "onData" }));
      };
  
      websocket.onmessage = (event) => {
          console.log("Received message:", JSON.parse(event.data));
          setDisasterList(getDisasterList(JSON.parse((event.data))));
      };
  
      websocket.onerror = (error) => console.error("WebSocket Error:", error);
  
      websocket.onclose = (event) => {
          if (event.wasClean) {
              console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
          } else {
              console.error("Connection died");
          }
      };
  
      return () => {
          console.log('언마운트 후 disconnected');
          websocket.close();
      };
      
  }, []);
  
  useEffect(() => {
    if (map){
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!')
      if(disasteList){
        const sd_list = []
        disasteList.forEach(disaster => {
          const location_list = disaster.location_code
        
          location_list.forEach(location_code => {
            //같은 지역에 재난문자가 있다면 원래
            for (let i = 0; i < sd_list.length; i++) {
              if (sd_list[i][0] === Number(location_code[0])) {
                  console.log('중복 제거 동작!!!')
                  sd_list.splice(i, 1); // i번째 원소를 삭제
                  i--; // 배열의 길이가 줄어들었으므로 인덱스를 하나 감소시킴
              }
            }
            sd_list.push([Number(location_code), disaster.disaster_type])
            // 해당 location_code를 기준으로 배열에서 원소를 삭제
            })
          
        });

        console.log(sd_list)
        //폴리곤을 갱신해주기
        renewPolygon(sd_list)
        
      }

      //zoom이 바뀔때 마다 메뉴얼카드 추가 / 삭제
      kakao.maps.event.addListener(map, 'zoom_changed', function() {
        var level = map.getLevel();
        // console.log('zoom Changed')
        // console.log(level)
        
      })
    
      const imageSrc =pinicon;
      const imageSize = new kakao.maps.Size(50, 50);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      
    }
    const newMarkerList = insertMarkerList(disasteList);


    // 1초 뒤에 새로운 마커 리스트를 지도에 그리는 함수를 실행하고, 그 결과를 마커 리스트로 설정
    
    // 이전 마커 리스트를 지우는 함수
    drawMarkerList(newMarkerList, map);
    setMarkerList(newMarkerList);
    console.log("====================");
    if(disasteList){

      console.log(currentPosition)
      if(currentPosition !== undefined){
        findPath(map, `${currentPosition[0]}, ${currentPosition[1]}`, `127.29307759409, 36.610261563595`, [currentPosition[1], currentPosition[0]]);
      }
    }
  }, [searchPlace, locations, disasteList, map]);

    return (
      
        <Container>
          <FindShelterBtn></FindShelterBtn>
          <LocationSelector onLocationSelect={handleLocationSelect} />
            <div id="map" style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
            }}>
            </div>
            
            <Modal
              style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)', // 모달 배경의 반투명 검정
                },
                content: {
                  width: '200px',
                  height: '200px',
                  
                  background: 'white', // 모달 내용 배경
                },
              }}
              isOpen = {popupOpen}
              onRequestClose={() => setpopupOpen(false)}
            >
              <div className='title'>
                {popupInfo.disasterType}
              </div>
              <div className='content'>
                {popupInfo.content}
              </div>
            </Modal>
        </Container>
    );
  };


export default MapContainer;