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
    img {
        width: 12%;
        margin-left: 5%;
    }
    span {
        width: 60%;
        margin-left: 8%;
        font-size: 16px;
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
    font-size: 14px;
    font-weight: 700;
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
    font-size: 14px;
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
				const moveMap = props.moveMap
        const [map, setMap] = useState(undefined);
				
				const [loadInfo, setLoadInfo] = useState(undefined)
        const [currentPosition, setCurrentPosition] = useState(undefined)
				const [LoadMode, setLoadMode] = useState(false)
        const [markerList, setMarkerList] = useState(undefined)
        const [shelterList, setShelterList] = useState(undefined)

				const drawLoad = async (destination) =>{
					const LoadInfo = await findPath(map, currentPosition, destination)
					const distance = (LoadInfo[1] / 1000).toFixed(1)
					const duration = Math.floor(LoadInfo[0] / 60)
					setLoadInfo([duration, distance])
					setLoadMode(true)
				}
        const insertSherterMarkerList = (shelterList) =>{
            if(map){
              const markerList = getShelterMarkerList(shelterList, map, drawLoad);
              if (markerList){
                markerList.forEach(marker => {
                  marker.setMap(null)
              });
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
        const mapContainer = document.getElementById('sheltermap');
        const mapOption = {
            center: new kakao.maps.LatLng(37.541, 126.986),
            level: 5
        };
        const map = new kakao.maps.Map(mapContainer, mapOption);
        /**현재 자기 위치 찍시 */
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    var lat = 36.597279,
                        lon = 127.299874
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
                    var defaultPosition = new kakao.maps.LatLng(36.597279, 127.299874);
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
            <div id="sheltermap" style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
            }}></div>
            { LoadMode && (
            <Topbar>
				<FindBtn>
                    <img src={car} alt='차 이미지'></img>
                    <span>{loadInfo[1]}km 약 {loadInfo[0]}분</span>
                </FindBtn>
                <StartBtn>
                    <span>출발 :</span>
                    <span>현 위치</span>
                </StartBtn>
                <ArriveBtn>
                    <span>도착 :</span>
                    <span>세종 조치원읍 세종여자고등학교</span>
                </ArriveBtn>
                </Topbar>)
						}
						
        </Container>
    );
}

export default FindShelter;