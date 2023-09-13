import React, { useState } from 'react'
import LoginCard from './LoginCard'
import RegisterCard from './RegisterCard'
export default function AccountHandler() {
  const [mode, setMode] = useState('login')

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
      ></LoginCard>
    ) : (
      <RegisterCard
      handleMode = {modeHandle}
      ></RegisterCard>
    )
  )
}
