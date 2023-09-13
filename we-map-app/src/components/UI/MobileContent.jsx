import React, {useState} from 'react'
import HomeScreen from '../accounts/HomeScreen'
import styled from 'styled-components'
import AccountHandler from '../accounts/AccountHandler'


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
        ></AccountHandler>
      ) : null}
    </Container>
  )
}
