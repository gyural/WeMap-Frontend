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
import missing from"../../../../images/missing.png"; // 실종 및 기타 이미지 경로 추가
import shelter from "../../../../images/shelter.png";
import { getPath } from "./navigation";
import Modal from "react-modal"
const { kakao } = window;

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
    "교통통제": carAccident,
    "실종": missing, // 실종 이미지 경로로 변경
    "기타": missing, // 기타 이미지 경로로 변경
    "대피소" : shelter,
};


/**
 * 
 * @param {*} disasteList 
 * @param {*} map 
 * @returns 
 */
const getMarkerList = (disasteList, map, setpopupOpen, setPopupInfo) =>{
    const resultList = []
    if(disasteList){
        for (const disaster of disasteList){
            if (disaster){
                let img = disasterTypeToImage[disaster.disaster_type]
                const menual = disaster.manual
                const msg = disaster.msg
                const disasterType = disaster.disaster_type
                const color = (disasterType === "실종" || disasterType === "기타") ? "orange": "red"
                if(img === undefined){
                    img = disasterTypeToImage["기타"]
                }
                const locationList = disaster.coordinate
                locationList.forEach(location => {
                    resultList.push(makeMarker(img.toString(), map, [location[0], location[1]], menual, msg,  disasterType, color, setpopupOpen, setPopupInfo))
                });
            }
            
        }
    }
    return resultList;
}

/**
 * 
 * @param {*} shelterList 
 * @param {*} map 
 * @param {*} drawLoad 
 */
const getShelterMarkerList = (shelterList, map, drawLoad) => {
    console.log(map)
    const resultList = []
    console.log("ㅈ니징")
    console.log(shelterList)
    if(shelterList){
        for (const shelter of shelterList){
            if(shelter){
                console.log(shelter)
                let img = disasterTypeToImage["대피소"]
                const shleterName = shelter.Name;
                const Address = shelter.Address;
                console.log(shelter.Latitude, shelter.Longitude)
                resultList.push(makeShelterMarker(img.toString(), map, [shelter.Latitude, shelter.Longitude], shleterName, Address, drawLoad))
            }
        }
    }
    console.log("dhkdhdk")

    return resultList
};


const makeShelterMarker = (image, targetmap, location, shleterName, Address, drawLoad) => {
    window.handleClick = (x, y) =>{
        drawLoad([x,y])
    }

    // 마커 객체 생성

    const markerPosition = new kakao.maps.LatLng(location[0], location[1])
    console.log(markerPosition)
    const imageSize = new kakao.maps.Size(40, 40);
    const markerImage = new kakao.maps.MarkerImage(image, imageSize);
    const marker = new kakao.maps.Marker({
        map: targetmap,
        position: markerPosition,
        image: markerImage
    });

    let convertShleterName = JSON.stringify(shleterName)
    let convertAddress = JSON.stringify(Address)
    
    convertShleterName = convertShleterName.replace(/"/g, '');
    convertAddress = convertAddress.replace(/"/g, '');

    const customDestination = location
    console.log(customDestination)
    var shleterCard = `<div class="manualContainer" style="background-color: #fff; display: flelx; flex-direction: column; width: 190px; height: 220px; padding: 10%; border-radius: 12px; box-sizing: border-box; position: relative;">
                            <div class="title" style= " width: 150px; margin: 0 auto; hecolor: balck; word-wrap: break-word; white-space: pre-wrap; margin-bottom: 3%;"><span style="font-size: 15px; font-weight: 700; color: #0081C9;">보호소명</span></br>${convertShleterName}</div>
                            <div class="title" style="width: 150px; margin: 0 auto; color: black; word-wrap: break-word; white-space: pre-wrap;"><span style="font-size: 15px; font-weight: 700; color: #0081C9;">보호소 주소</span></br>${convertAddress}</div>
                            
                            <div class="button-wrapper" style="width: 95%; display: flex; justify-content: center; position: absolute; bottom: 4%; left: 0; box-sizing: border-box; ">
                                <button onclick="handleClick(${customDestination[0]}, ${customDestination[1]})" style="background-color: #0081C9; color: #fff; border: none; border-radius: 12px; padding: 4px; box-sizing: border-box; width: 70%; height: 100%; cursor:pointer;
                                font-weight: 700;">보호소 길찾기</button>
                            </div>
                        </div>`

    const customOverlay = new kakao.maps.CustomOverlay({
        position: markerPosition,
        content: shleterCard,
        yAnchor: 1.3
            });
    // 마커에 클릭 이벤트 설정
    let isOverlayShown = false;  
    kakao.maps.event.addListener(marker, 'click', function() {
        if (isOverlayShown) {
            customOverlay.setMap(null);  // 오버레이 숨기기
        } else {
            customOverlay.setMap(targetmap);   // 오버레이 보여주기
        }

        isOverlayShown = !isOverlayShown;  // 상태 토글
    });

      // 기본적으로 커스텀 오버레이는 숨김 상태
    customOverlay.setMap(null);
    console.log(marker)
    return marker
}
/**
 * 
 * @param {*} image 
 * @param {*} targetmap 
 * @param {*} location 
 * @returns 
*/
const makeMarker = (image, targetmap, location, menual, msg, disasterType, color, setpopupOpen, setPopupInfo) => {
    window.handleClick = (dtype, dmenual) =>{
      setPopupInfo({
        "disasterType" : dtype,
        "content" : dmenual}
      )
      setpopupOpen(true)
      //Modal을 이용해서 띄어야함
      //popup에 들어갈 내용을 바꾸고
      // setPopupInfo()
      // //popup을 연다
      // setpopupOpen()
  }
    const markerPosition = new kakao.maps.LatLng(location[0], location[1])
    const imageSize = new kakao.maps.Size(40, 40);
    const markerImage = new kakao.maps.MarkerImage(image, imageSize);
    const marker = new kakao.maps.Marker({
        map: targetmap,
        position: markerPosition,
        image: markerImage
    });
    const testManual = JSON.stringify(menual)
    const singleQuotedString = testManual.replace(/"/g, "'");
    var disasterCardContent = `<div class="manualContainer" style="background-color: #fff; width: 190px; height: 200px; padding: 10%; border-radius: 12px; box-sizing: border-box; position: relative;">
                            <div class="title" style="color: ${color}; font-weight: 700; font-size: 14px;">${disasterType} 재난 문자</div>
                            <div class="manual-content" style="width: 100%; height: 70%; box-sizing: border-box; overflow-y: scroll;">
                            <style>
                                .manual-content::-webkit-scrollbar {
                                    width: 6px; /* 스크롤바 너비 조정 */
                                }

                                .manual-content::-webkit-scrollbar-thumb {
                                    background-color: #ccc; /* 스크롤바 색상 지정 */
                                }
                                p {
                                display: block;
                                margin-block-start: 0.1em;
                                margin-block-end: 1em;
                                margin-inline-start: 0px;
                                margin-inline-end: 0px;
                            }
                            </style>
                            <p style=" width: 100%; height: 100%; white-space: pre-line; margin-top: 0" >
                                ${msg}
                            </p>
                        </div>
                        <div class="button-wrapper" style="width: 100%; display: flex; justify-content: center; position: absolute; bottom: 4%; left: 0; box-sizing: border-box; ">
                            <button onclick="handleClick('${disasterType}', ${singleQuotedString})" style="background-color: #0081C9; color: #fff; border: none; border-radius: 12px; padding: 4px; box-sizing: border-box; width: 70%; height: 100%; cursor:pointer;
                            font-weight: 700;">메뉴얼 보기</button>
                        </div>
                    </div>`


    const customOverlay = new kakao.maps.CustomOverlay({
        position: markerPosition,
        content: disasterCardContent,
        yAnchor: 1.3
            });


    
    // 마커에 클릭 이벤트 설정
    let isOverlayShown = false;  
    kakao.maps.event.addListener(marker, 'click', function() {
        if (isOverlayShown) {
            customOverlay.setMap(null);  // 오버레이 숨기기
        } else {
            customOverlay.setMap(targetmap);   // 오버레이 보여주기
        }

        isOverlayShown = !isOverlayShown;  // 상태 토글
    });

      // 기본적으로 커스텀 오버레이는 숨김 상태
    customOverlay.setMap(null);
    
    return marker
}


/**
 * 
 * @param {*} markerList 
 * @param {*} map 
 */
const eraseMarkerList = (markerList, map) =>{
    markerList.forEach(marker => {
        marker.setMap(null)
        console.log('작동')
    });
}

/**
 * 
 * @param {*} markerList 
 * @param {*} map 
 */
const drawMarkerList = (markerList, map) =>{
    markerList.forEach(marker => {
        marker.setMap(map)
    
    });
}
export {getMarkerList, makeMarker, eraseMarkerList, drawMarkerList, getShelterMarkerList}