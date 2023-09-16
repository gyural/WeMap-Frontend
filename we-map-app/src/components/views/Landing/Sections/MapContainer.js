import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { createPolygon, getPolygonPath } from './createPolygon'
import colors from '../../../../Common/Color'
import { drawPolygon } from './createPolygon'
const Container = styled.div`
  width: 100%;
  height: 100%;

`;
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
     * 다각형지도 Drawing
     */
    const sd_list = [11040, 39010, 38]
    drawPolygon(map, sd_list)
    
  }, [searchPlace, socketListenr])

  return (
    <Container>

    <div
        id="myMap"
        style={{
            width: '100%', 
            height: '100%', 
        }}>
    </div>
    </Container>
  )
}

export default MapContainer