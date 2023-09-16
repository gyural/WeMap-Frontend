// HomeScreen.js

import React from 'react';
import styled from 'styled-components';
import img1 from "../../images/homemap.png";
import colors from '../../Common/Color';

const Container = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  padding-top: 10%; 
`;

const BigTitle = styled.h1`
  color: ${colors.black}; 
  margin-top: 10%; 
  font-size: 200%; 
  & span1 {
    color: ${colors.mainBlue}; 
  }
`;

const SmallTitle = styled.h3`
  color: ${colors.black}; 
  font-size: 140%; 
  & span2 {
    color: ${colors.mainBlue}; 
  }
`;

const Image = styled.img`
  width: 80%;
  margin-top: 5%; 
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
  padding: 1% 3%; 
  font-size: 150%; 
  font-weight: bold;
  margin-top: 2%; 
  margin-bottom: 2%; 
  width: 100%;
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
  padding: 1% 3%; 
  font-size: 150%; 
  font-weight: bold;
  margin-top: 2%; 
  width: 100%;
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
      <BigTitle>Welcome to <span1>WeMap</span1> !</BigTitle>
      <SmallTitle><span2>WeMap</span2>에 오신 것을 환영합니다.</SmallTitle>
      <Image src={img1} alt="WeMap 이미지" />
      <Buttons>
        <Button1>Sign In</Button1>
        <Button2 onClick={moveAccounts}>Sign Up</Button2>
      </Buttons>
    </Container>
  );
}

export default HomeScreen;
