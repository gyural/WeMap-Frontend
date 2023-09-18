/**
 * 
 * @param {*} socketData 웹소캣으로 받은 데이터
 * @return sockte
 */
const getDisasterList = (socketData) =>{
    const resultList = []
    
    socketData.forEach(disaster => {
        resultList.push({
          disaster_type : disaster.disaster_type,
          location_code : Number(disaster.location_code),
          msg : disaster.msg,
          pk : disaster.md101_sn,
          location_name : disaster.location_name,
          scale : getscale(disaster.location_code),
        })
        
    });
    return resultList;
}

const getscale = (location_id) =>{
    const len = location_id.length

    if (len === 2){
      //시/도 스케일일 때
      return 10
    }else if (len === 5){
      //구/군 스케일일 때
      return 7
    }else {
      return 5
    }
}


const isView = () => {

}
export {getDisasterList}