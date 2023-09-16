import React, { useState } from 'react'
import LoginCard from './LoginCard'
import RegisterCard from './RegisterCard'
export default function AccountHandler(props) {
  const moveHome = props.moveHome
  const moveUserInfo = props.moveUserInfo
  const moveMap = props.moveMap
  const [mode, setMode] = useState(props.accountMode)

  const modeHandle = () =>{
    if (mode === 'login'){
      setMode('signUp')
    }else{
      setMode('login')
    }
    console.log('!!!')
  }
  return (
    mode === 'login'? (
      <LoginCard
        handleMode = {modeHandle}
        moveHome = {moveHome}
        moveUserInfo = {moveUserInfo}
        moveMap = {moveMap}
      ></LoginCard>
    ) : (
      <RegisterCard
      handleMode = {modeHandle}
      ></RegisterCard>
    )
  )
}
