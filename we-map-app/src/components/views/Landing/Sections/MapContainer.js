/* global kakao */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createPolygon, erasePolygon, getPolygonPath, makePolygon } from './createPolygon';
import colors from '../../../../Common/Color';
import { drawPolygon } from './createPolygon';
import { getDisasterList } from './DisasterList';
import { findPath } from './findLoad';

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
import { drawMarkerList, eraseMarkerList, getMarkerList } from './createMarker';
import LocationSelector from "../Sections/LocationSelector";



/**Map Container를 감싸는 최종 부모 컴포넌트 */
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

  async function fetchCoordinates(locationName) {
    const response = await fetch('https://total-code.s3.ap-northeast-2.amazonaws.com/data.json');
    const data = await response.json();
  
    let coordinates;
  
    if (data[locationName]) { // 도/특별시/광역시 단위
      coordinates = data[locationName].current_coordinate;
    } else {
      for (let city in data) {
        if (data[city].군구[locationName]) { // 군/구 단위
          coordinates = data[city].군구[locationName].current_coordinate;
        } else {
          for (let district in data[city].군구) {
            if (data[city].군구[district].읍면동[locationName]) { // 읍/면/동 단위
              coordinates = data[city].군구[district].읍면동[locationName];
            }
          }
        }
      }
    }
  
    return coordinates;
  }
  

  const MapContainer = ({ searchPlace }) => {
    const [locationData, setLocationData] = useState(null);

    const [map, setMap] = useState(undefined);
    const [polygonList, setPolygonList] = useState([])
    const [markerList, setMarkerList] = useState([])
    const [locations, setLocations] = useState([]);
    const [disasteList , setDisasterList] = useState([])
    const [zoom, setZoom] = useState(undefined)
 
    const renewPolygon = async (sd_list) =>{
      //기존 polygon지우기
      erasePolygon(polygonList, map)
      const newPolygonList = await makePolygon(sd_list)
      drawPolygon(newPolygonList, map)
      setPolygonList(newPolygonList)
    }

    const insertMarkerList = (disasteList) => {
      if (map) {
        const markerList = getMarkerList(disasteList, map);
        console.log('반환된 마커 리스트');
        console.log(markerList);
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
    function onLocationButtonClick(locationName) {
      fetchCoordinates(locationName).then(coords => {
          const [lat, lng] = coords;
          map.setCenter(new kakao.maps.LatLng(lat, lng));
      });
  }
  
  useEffect(() => {
      const mapContainer = document.getElementById('map');
  
      const mapOption = {
          center: new kakao.maps.LatLng(33.450701, 126.570667), // default center
          level: 14
      };
  
      const map = new kakao.maps.Map(mapContainer, mapOption);
      
      // Set user's current location on the map
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;
              const locPosition = new kakao.maps.LatLng(lat, lon);
              
              map.setCenter(locPosition);
  
              // Set marker for user's current location
              const userMarkerImage = new kakao.maps.MarkerImage(user, new kakao.maps.Size(50, 50));
              const userMarker = new kakao.maps.Marker({
                  map: map,
                  position: locPosition,
                  image: userMarkerImage
              });
          }, function (error) {
              alert("위치 파악을 실패하였습니다");
              map.setCenter(mapOption.center);
          });
      } else {
          map.setCenter(mapOption.center);
      }
  
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
      if (map && disasteList) {
          // Process disaster data and update polygons/markers on the map
          
          // TODO: Add your logic here...
  
      }
  
  }, [map, disasteList]);
  
  


  return (
    <Container>
      {/* onLocationButtonClick 함수를 LocationSelector 컴포넌트에 전달 */}
      <LocationSelector onLocationButtonClick={onLocationButtonClick} />
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