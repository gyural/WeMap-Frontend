import './App.css';
import styled from 'styled-components'
import { createContext, useState } from 'react';
import LoginCard from './components/accounts/LoginCard';
import RegisterCard from './components/accounts/RegisterCard';
import SidebarCard from './components/sidebar/SidebarCard';
import EmergencyStep from './components/step/EmergencyStep';
import FindLoad from './components/findLoad/FindLoad';
import wifiIcon from './images/device_wifi.png'
import signalIcon from './images/device_signal.png'
import batteryIcon from './images/device_bettery.png'
import Clock from './components/UI/Clock';
import AccountHandler from './components/accounts/AccountHandler';
import MobileContent from './components/UI/MobileContent';
// import {socket} from './APIs/Websocket'
const AuthContext = createContext();

const MobileFrame = styled.div`
  width: 100%;
  height: 595px;
  max-width: 330px; /* 모바일 화면의 최대 너비 */
  max-height: 1040px;
  margin: 0 auto; /* 가운데 정렬 */
  margin-top: 4%;
  border: 1px solid #ccc; /* 모바일 프레임 테두리 스타일 */
  border-radius: 10px; /* 모바일 프레임 테두리 둥글게 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
  background-color: #fff; /* 배경색 */
  padding: 8px; /* 내부 여백 */
  position: relative;
`;

const MobileHeader = styled.div`
  width: 100%;
  height: 4%;
  box-sizing: border-box;
  background-color: rgba(222, 0, 0, 0);
  padding: 6%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 4;
  img{
    display: block;
    height: 15.6px;
    width: 15.6px;
    background-size: cover;
    margin-left: 4px;
  }
`;


function App() {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userName: '',
    dis_level : undefined,
    nickname: undefined,
    password : undefined,
    updated_at: undefined, 
  });
  
  return (
    <MobileFrame>
      <MobileHeader>
        <Clock
          size = '1px'
        ></Clock>
        <img src={signalIcon} alt="시그널 아이콘"/>
        <img src={wifiIcon} alt="와이파이 아이콘"/>
        <img src={batteryIcon} alt="배터리 아이콘"/>
      </MobileHeader>
      <AuthContext.Provider value={{ authState, setAuthState }}>

        <MobileContent></MobileContent>
      </AuthContext.Provider>
    </MobileFrame>
  );
}

export default App;
export {AuthContext};

