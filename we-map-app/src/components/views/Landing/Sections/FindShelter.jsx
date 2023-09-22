import React, { useEffect, useState } from 'react';
import axios from "axios";
import styled, { createGlobalStyle } from 'styled-components';
import { createPolygon, erasePolygon, getPolygonPath, makePolygon } from './createPolygon';

import { drawPolygon } from './createPolygon';
import { getDisasterList } from './DisasterList';
import { getPath, testCoordinate } from './navigation';
import { findPath } from './findLoad';
import { drawMarkerList, eraseMarkerList, getMarkerList } from './createMarker';
import LocationSelector from "../Sections/LocationSelector";

import colors from '../../../../Common/Color';
import locationData from '../../../../locationData.json';

import backarrow from "../../../../images/left-arrow.png";
import car from "../../../../images/car.png";

const Container = styled.div`
    padding-top: 10%;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Topbar = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 3%;
    z-index: 2;
`;

const BackArrow = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    width: 20px;
    height: 20px;
    z-index: 2;
`;

const Image = styled.img`
    width: 20px;
    height: 20px;
    z-index: 2;
`;

const FindBtn = styled.div`
    background-color: ${colors.mainBlue};
    color: ${colors.white};
    border: 1px solid ${colors.mainBlue};
    border-radius: 20px;
    width: 75%;
    margin: 0 13%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    img {
        width: 15%;
        height: 15%;
        margin-left: 5%;
    }
    span {
        width: 70%;
        height: 10%;
        margin-left: 8%;
    }
    z-index: 2;
`;

const StartBtn = styled.div`
    background-color: ${colors.white};
    color: ${colors.black};
    border: 1px solid ${colors.white};
    border-radius: 20px;
    width: 90%;
    height: 5%;
    font-size: 15px;
    font-weight: 700;
    margin: 3%;
    display: flex;
    align-items: center;
    span {
        margin-left: 3%;
    }
    z-index: 2;
`;

const ArriveBtn = styled.div`
    background-color: ${colors.white};
    color: ${colors.black};
    border: 1px solid ${colors.white};
    border-radius: 20px;
    width: 90%;
    height: 5%;
    font-size: 15px;
    font-weight: 700;
    display: flex;
    align-items: center;
    span {
        margin-left: 3%;
    }
    z-index: 2;
`;


const FindShelter = (props) => {
    const { kakao } = window;
        
        const [map, setMap] = useState(undefined);
        
        useEffect(() => {
        const mapContainer = document.getElementById('map');
        const mapOption = {
            center: new kakao.maps.LatLng(37.541, 126.986),
            level: 14
        };
        const map = new kakao.maps.Map(mapContainer, mapOption);
    
        // 지도 객체를 상태에 저장
        setMap(map);
    }, []);

    const moveMap = props.moveMap

    return (
        <Container>
            <div id="map" style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
            }}></div>
            <Topbar>
                <BackArrow onClick={moveMap}>
                    <Image src={backarrow} alt="뒤로가기 버튼"></Image>
                </BackArrow>
                <FindBtn>
                    <img src={car} alt='차 이미지'></img>
                    <span>1.2km 약 6분</span>
                </FindBtn>
            </Topbar>
            <StartBtn>
                <span>출발 :</span>
                <span>세종 조치원읍 고려대학교</span>
            </StartBtn>
            <ArriveBtn>
                <span>도착 :</span>
                <span>세종 조치원읍 세종여자고등학교</span>
            </ArriveBtn>
        </Container>
    );
}

export default FindShelter;