import React, {useState} from 'react'
import HomeScreen from '../accounts/HomeScreen'
import styled from 'styled-components'
import AccountHandler from '../accounts/AccountHandler'
import UserInfo from '../accounts/UserInfo';


const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;
export default function MobileContent() {
  const [activetab, setActivetab] = useState('home')

  const moveAccounts = () =>{
    setActivetab('accounts')
  }

  const moveHome = () =>{
    setActivetab('home')
  }

  const moveUserInfo = () =>{
    setActivetab('userInfo')
  }
  return (
    <Container>
    
    {
      activetab === 'home' ? (
        <HomeScreen
          moveAccounts = {moveAccounts}
        ></HomeScreen>
      ): 
      activetab === 'accounts' ? (
        <AccountHandler
          moveHome = {moveHome}
          moveUserInfo = {moveUserInfo}
        ></AccountHandler>
      ) : 
      activetab === 'userInfo' ? (
        <UserInfo
         moveHome = {moveHome}
        ></UserInfo>
      )
      :null}
    </Container>
  )
}
