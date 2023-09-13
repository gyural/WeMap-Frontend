// HomeScreen.js

import React from 'react';
import styled from 'styled-components';
import img1 from "../../images/homemap.png";
import colors from '../../Common/Color';
const Container = styled.div`
  text-align: center;
`;

const BigTitle = styled.h1`
  color: ${colors.black}; 
  margin-top: 100px;
  & span1 {
    color: ${colors.mainBlue}; 
  }
`;

const SmallTitle = styled.h3`
  color: ${colors.black}; 
  & span2 {
    color: ${colors.mainBlue}; 
  }
`;
const Image = styled.img`
  width: 300px;
  height: 300px; 
  margin-top: 20px; 
`;
const Buttons = styled.div`
  margin-top: 20px; 
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Button1 = styled.button`
  background-color: ${colors.mainBlue}; 
  color: ${colors.white};
  padding: 10px 20px;
  font-size: 25px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 25%;
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
  padding: 10px 20px;
  font-size: 25px;
  font-weight: bold;
  margin-top: 10px;
  width: 25%;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  &:hover {
    background-color: ${colors.hoverGray}; 
  }
`;

function HomeScreen(props) {

  const moveAccounts = props.moveAccounts
  return (
    <Container>
      <BigTitle>Welcome to <span1>WeMap</span1> !</BigTitle>
      <SmallTitle><span2>WeMap</span2>에 오신 것을 환영합니다.</SmallTitle>
      <Image src={img1} alt="WeMap 이미지" />
      <Buttons>
        <Button1>Get Started</Button1>
        <Button2
          onClick = {moveAccounts}
        >Log In</Button2>
      </Buttons>

    </Container>
  );
}

export default HomeScreen;
