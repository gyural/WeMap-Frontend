import colors from "../../../../Common/Color";
const { kakao } = window


const insertManualCard = (map) =>{

    /**
     * 메뉴얼카드 기본 스타일
     */
    var content = `<div class="manualContainer" style="background-color: #fff; width: 150%; height: 200px; padding: 10%; border-radius: 12px; box-sizing: border-box; position: relative;">
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
            산사태 경보 메뉴얼입니다........
            산사태 경보 메뉴얼입니다........
            산사태 경보 메뉴얼입니다........
            산사태 경보 메뉴얼입니다.......산사태 경보 메뉴얼입니다.......v
        </p>
    </div>
    <div class="button-wrapper" style="width: 100%; display: flex; justify-content: center; position: absolute; bottom: 4%; left: 0; box-sizing: border-box; ">
        <button onclick="alert('haha')" style="background-color: #0081C9; color: #fff; border: none; border-radius: 12px; padding: 4px; box-sizing: border-box; width: 70%; height: 100%;
        font-weight: 700;">대피소 찾기</button>
    </div>
</div>`;



    
    // 커스텀 오버레이가 표시될 위치입니다 
    var position = new kakao.maps.LatLng(37.49887, 127.026581);  
    
    // 커스텀 오버레이를 생성합니다
    var customOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: content,
        xAnchor: 0.3,
        yAnchor: 0.91
    })

    // 커스텀 오버레이를 지도에 표시합니다
}

export {insertManualCard}