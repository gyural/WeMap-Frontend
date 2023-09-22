import React, { useEffect, useState } from 'react';
import axios from "axios";
import styled, { createGlobalStyle } from 'styled-components';
import { createPolygon, erasePolygon, getPolygonPath, makePolygon } from './createPolygon';

import { drawPolygon } from './createPolygon';
import { getDisasterList } from './DisasterList';
import { getPath, getShelter, testCoordinate } from './navigation';
import { findPath } from './findLoad';
import { drawMarkerList, eraseMarkerList, getShelterMarkerList } from './createMarker';
import LocationSelector from "../Sections/LocationSelector";

import colors from '../../../../Common/Color';
import locationData from '../../../../locationData.json';

import backarrow from "../../../../images/left-arrow.png";
import car from "../../../../images/car.png";
import user from "../../../../images/user.png";

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
    height: 20%;
    display: flex;
    flex-direction: column;
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
    width: 60%;
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    img {
        width: 12%;
        margin-left: 5%;
    }
    span {
        width: 60%;
        margin-left: 8%;
        font-size: 15px;
    }
    z-index: 2;
`;

const StartBtn = styled.div`
    background-color: ${colors.white};
    color: ${colors.black};
    border: 1px solid ${colors.white};
    border-radius: 20px;
    width: 90%;
    height: 30%;
    font-size: 13px;
    margin: 2%;
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
    height: 30%;
    font-size: 13px;
    display: flex;
    align-items: center;
    span {
        margin-left: 3%;
    }
    z-index: 2;
`;


const FindShelter = (props) => {
    const { kakao } = window;
    const drawLoad = () =>{
        alert("길그리기 함수 실행")
    }
        const [map, setMap] = useState(undefined);
        const [currentPosition, setCurrentPosition] = useState(undefined)
        const [markerList, setMarkerList] = useState(undefined)
        const [shelterList, setShelterList] = useState(undefined)
        const insertSherterMarkerList = (shelterList) =>{
            if(map){
                const markerList = getShelterMarkerList(shelterList, map, drawLoad);
                if (markerList){
                    markerList.forEach(marker => {
                        marker.setMap(null)
                    });
                    console.log(markerList)
                    drawMarkerList(markerList, map)
                    return markerList
                } 
                else{
                return []  
                }
            }
            else{
                return [];
            }
        }

        useEffect(() => {
        const mapContainer = document.getElementById('map');
        const mapOption = {
            center: new kakao.maps.LatLng(37.541, 126.986),
            level: 5
        };
        const map = new kakao.maps.Map(mapContainer, mapOption);
        /**현재 자기 위치 찍시 */
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
        // 지도 객체를 상태에 저장
        setMap(map);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(currentPosition){
                    const res = await getShelter([currentPosition[1], currentPosition[0]]);
                    setShelterList(res.data.body)
                    console.log(shelterList)
                    const newMarkerList =  insertSherterMarkerList(res.data.body)
                    setMarkerList(newMarkerList)
                    console.log(newMarkerList)
                }
            } catch (error) {
                console.error(error);
            }
        };
        if(currentPosition){
            fetchData();

        }
    }, [currentPosition]);


    // const moveMap = props.moveMap

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
                {/* <BackArrow onClick={moveMap}>
                    <Image src={backarrow} alt="뒤로가기 버튼"></Image>
                </BackArrow> */}
                <FindBtn>
                    <img src={car} alt='차 이미지'></img>
                    <span>1.2km 약 6분</span>
                </FindBtn>
                <StartBtn>
                    <span>출발 :</span>
                    <span>세종 조치원읍 고려대학교</span>
                </StartBtn>
                <ArriveBtn>
                    <span>도착 :</span>
                    <span>세종 조치원읍 세종여자고등학교</span>
                </ArriveBtn>
                </Topbar>
        </Container>
    );
}

export default FindShelter;