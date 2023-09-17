import React, {useState} from 'react'
import HomeScreen from '../accounts/HomeScreen'
import styled from 'styled-components'
import AccountHandler from '../accounts/AccountHandler'
import UserInfo from '../accounts/UserInfo';
import MapContainer from '../views/Landing/Sections/MapContainer';
import LandingPage from '../views/Landing/LandingPage';
import SidebarCard from '../sidebar/SidebarCard';
import EmergencyStep from '../step/EmergencyStep';
const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;
export default function MobileContent() {
  const [activetab, setActivetab] = useState('home')
  const [accountMode, setAccountMode] = useState('login')
  const moveAccounts = (mode) =>{
    if (mode === 'signUp'){
      setAccountMode('signUp')
    }else{
      setAccountMode('login')
    }
    setActivetab('accounts')
  }

  const moveHome = () =>{
    setActivetab('home')
  }

  const moveUserInfo = () =>{
    setActivetab('userInfo')
  }
  const moveMap = () =>{
    setActivetab('map')
  }
  const moveSideMenu = () =>{
    setActivetab('sideMenu')
  }
  const moveEmergencyStep = () =>{
    setActivetab('emergencyStep')
  }
  return (
    <Container>
    
    {
      activetab === 'home' ? (
        <HomeScreen
          moveAccounts = {moveAccounts}
          moveMap = {moveMap}

        ></HomeScreen>
      ): 
      activetab === 'accounts' ? (
        <AccountHandler
          moveHome = {moveHome}
          moveUserInfo = {moveUserInfo}
          moveMap = {moveMap}
          accountMode = {accountMode}
        ></AccountHandler>
      ) : 
      activetab === 'userInfo' ? (
        <UserInfo
         moveHome = {moveHome}
         moveSideMenu = {moveSideMenu}
         moveEmergencyStep = {moveEmergencyStep}
        ></UserInfo>
      ) : 
      activetab === 'map' ? (
        <LandingPage
         moveHome = {moveHome}
         moveSideMenu = {moveSideMenu}
        ></LandingPage>
      ) : 
      activetab === 'sideMenu' ? (
        <SidebarCard
         moveHome = {moveHome}
         moveMap = {moveMap}
         moveUserInfo = {moveUserInfo}
        ></SidebarCard>
      ) : 
      activetab === 'emergencyStep' ? (
        <EmergencyStep
         moveMap = {moveMap}
         moveUserInfo = {moveUserInfo}
        ></EmergencyStep>
      )
      :null}
    </Container>
  )
}
