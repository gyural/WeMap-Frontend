import React from 'react'
import { getBoundaryPoints } from '../../APIs/UnitConvert'
import { utmToCentral } from '../../APIs/UnitConvert'
export default function APITestButton() {
  return (
    <>
    <button
     style= {{
        width: '40px',
        height: '20px',
     }}
     onClick={async ()=>{
        console.log(await getBoundaryPoints(11040))
      }}
     
    >API 테스팅 버튼</button>

    </>
)
}
