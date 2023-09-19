/**
 * 
 * @param {*} socketData 웹소캣으로 받은 데이터
 * @return sockte
 */
const getDisasterList = (socketData) =>{
    const resultList = []
    try{
      socketData.forEach(disaster => {
        resultList.push({
          disaster_type : disaster.disaster_type,
          location_code : convertIntList(disaster.location_code),
          msg : disaster.msg,
          pk : disaster.md101_sn,
          location_name : disaster.location_name,
          scale : getscale(disaster.location_code),
          coordinate : disaster.coordinate
        })
        
      });
      return resultList;
    }
    catch{
      console.log('소캣 데이터 전처리 에러')
      console.log(socketData)
      return []
    }
    
    
}

const getscale = (location_code) =>{
    console.log(location_code)
    const len = location_code[0].length

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

const convertIntList = (slist) => {
  const resultList = []
  slist.forEach(element => {
    resultList.push(Number(element))
  });
  return resultList;
 }
export {getDisasterList}