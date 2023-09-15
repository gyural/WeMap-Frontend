import React, { useEffect, useRef } from 'react';
import styled from 'styled-components'
const {sop} = window

const Container = styled.div`
  width: 200px;
  height: 200px;
`;
export default function TestMapContainer() {
  const mapRef = useRef(null);

  useEffect(() => {
    let map = null;

    // 맵 컨테이너가 이미 초기화되지 않은 경우에만 초기화합니다.
    map = sop.map('map');
    map.setView([953820, 1953437], 9);
    mapRef.current = map;
    // 컴포넌트가 언마운트될 때 맵을 해제합니다.
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <Container>
      <div id="map" style={{ width: '100%', height: '100%' }}>
        tlqkf
      </div>
    </Container>
  );
}
