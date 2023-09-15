import React, { useEffect, useState } from 'react'
import { getPolygonPath } from './createPolygon'
import colors from '../../../../Common/Color'


const { kakao } = window
const MapContainer = ({ searchPlace }) => {
  const [socketListenr, setSocketListenr] = useState(undefined)
  console.log(socketListenr)

  
  useEffect(() => {
    try {
      const socket = new WebSocket('wss://lvb2z5ix97.execute-api.ap-northeast-2.amazonaws.com/dev?token=sometoken');

      socket.onopen = (event) => {
          console.log('Connected:', event);
      };

      socket.onmessage = (event) => {
        setSocketListenr(JSON.parse(event.data))
          // 웹 페이지에 데이터를 표시하는 로직을 추가합니다.
      };

      socket.onclose = (event) => {
          console.log('Connection closed:', event);
      };

      socket.onerror = (error) => {
          console.error('WebSocket Error:', error);
      };

  } catch (error) {
      console.log(error);
  }
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    const container = document.getElementById('myMap')
    const options = {
      center: new kakao.maps.LatLng(37.541,126.986),
      level: 8,
    }
    const map = new kakao.maps.Map(container, options)

    const ps = new kakao.maps.services.Places()

    ps.keywordSearch(searchPlace, placesSearchCB)

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds()

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i])
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }

        map.setBounds(bounds)
      }
    }
    
    /**
     * 
     * @param {*} sd_code_List 표시할 다각형 지역코드 리스트 
     */
    const createPolygon = async (sd_code) =>{
      var polygonPath = [];
      
      polygonPath.push(await getPolygonPath(11010))
      polygonPath.push(await getPolygonPath(11030))
      
      // 지도에 표시할 다각형을 생성합니다
      var polygon = new kakao.maps.Polygon({
          path:polygonPath, // 그려질 다각형의 좌표 배열입니다
          strokeWeight: 1.5, // 선의 두께입니다
          strokeColor: colors.red, // 선의 색깔입니다
          strokeOpacity: 0.25, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: 'solid', // 선의 스타일입니다
          fillColor: colors.red, // 채우기 색깔입니다
          fillOpacity: 0.25, // 채우기 불투명도 입니다
          zIndex: 10
      });

      polygon.setMap(map);
    }
    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      })

      // 마커에 클릭이벤트 등록
      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭 시 장소명이 인포윈도우 표출
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
        infowindow.open(map, marker)
      })
    }
    /**
     * 다각형지도 실행
     */
    createPolygon(11040)
  }, [searchPlace, socketListenr])

  return (
     <div
        id="myMap"
        style={{
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: '40%', 
            height: '80%', 
        }}>
     </div>
  )
}

export default MapContainer