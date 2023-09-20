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
    "실종": missing, // 실종 이미지 경로로 변경
    "기타": missing, // 기타 이미지 경로로 변경
};


/**
 * 
 * @param {*} disasteList 
 * @param {*} map 
 * @returns 
 */
const getMarkerList = (disasteList, map) =>{
    const resultList = []
    if(disasteList){
        for (const disaster of disasteList){
            if (disaster){
                let img = disasterTypeToImage[disaster.disaster_type]
                const msg = disaster.manual
                
                if(img === undefined){
                  img = disasterTypeToImage["기타"]
                }
                const locationList = disaster.coordinate
                locationList.forEach(location => {
                    resultList.push(makeMarker(img.toString(), map, [location[0], location[1]], msg))
                });
            }
            
        }
    }
    return resultList
}
/**
 * 
 * @param {*} image 
 * @param {*} targetmap 
 * @param {*} location 
 * @returns 
 */
const makeMarker = (image, targetmap, location, msg) => {
    console.log(image)
    const markerPosition = new kakao.maps.LatLng(location[0], location[1])
    const imageSize = new kakao.maps.Size(40, 40);
    const markerImage = new kakao.maps.MarkerImage(image, imageSize);
    const marker = new kakao.maps.Marker({
        map: targetmap,
        position: markerPosition,
        image: markerImage
    });
    

      
      const customOverlay = new kakao.maps.CustomOverlay({
          position: markerPosition,
          content: `<div class="manualContainer" style="background-color: #fff; width: 190px; height: 200px; padding: 10%; border-radius: 12px; box-sizing: border-box; position: relative;">
          <div class="title" style="color: red; font-weight: 700; font-size: 14px;">산사태 경보 메뉴얼</div>
          <div class="manual-content" style="width: 100%; height: 65%; box-sizing: border-box; overflow-y: scroll;">
              <style>
                  .manual-content::-webkit-scrollbar {
                      width: 6px; /* 스크롤바 너비 조정 */
                  }
      
                  .manual-content::-webkit-scrollbar-thumb {
                      background-color: #ccc; /* 스크롤바 색상 지정 */
                  }
              </style>
              <p style="display: block; width: 100%; height: 100%; white-space: pre-line;">
                  ${msg}
              </p>
          </div>
          <div class="button-wrapper" style="width: 100%; display: flex; justify-content: center; position: absolute; bottom: 4%; left: 0; box-sizing: border-box; ">
              <button onclick="alert('haha')" style="background-color: #0081C9; color: #fff; border: none; border-radius: 12px; padding: 4px; box-sizing: border-box; width: 70%; height: 100%;
              font-weight: 700;">대피소 찾기</button>
          </div>
      </div>`,
          yAnchor: 1.3
      });
      
      let isOverlayShown = false;  
      // 마커에 클릭 이벤트 설정
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
export {getMarkerList, makeMarker, eraseMarkerList, drawMarkerList}