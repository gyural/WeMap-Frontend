// HomeScreen.js

import React from 'react';
import styled from 'styled-components';
import img1 from "../../images/WeMap.png";
import colors from '../../Common/Color';

const Container = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  padding-top: 10%; 
`;

const Image = styled.img`
  width: 80%;
  margin: 25% 0 10% 0; 
`;

const Buttons = styled.div`
  margin-top: 5%; 
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button1 = styled.button`
  background-color: ${colors.mainBlue}; 
  color: ${colors.white};
  padding: 2% 5%;  
  font-size: 150%; 
  font-weight: bold;
  margin-top: 3%; 
  margin-bottom: 2%; 
  width: 90%;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  &:hover {
    background-color: ${colors.hoverBlue};
  }
`;

const Button2 = styled.button`
  background-color: ${colors.gray}; 
  color: ${colors.white};
  padding: 2% 5%; 
  font-size: 150%; 
  font-weight: bold;
  margin-top: 2%; 
  width: 90%;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  &:hover {
    background-color: ${colors.hoverGray}; 
  }
`;

function HomeScreen(props) {
  const moveAccounts = props.moveAccounts;
  return (
    <Container>
      
      <Image src={img1} alt="WeMap 이미지" />
      <Buttons>
        <Button2 onClick={()=>{
          moveAccounts('signUp')
        }
        }>Sign Up</Button2>
        <Button1 onClick={() =>{
            moveAccounts('login')
          }
          }>Sign In</Button1>
      </Buttons>
    </Container>
  );
}

export default HomeScreen;
