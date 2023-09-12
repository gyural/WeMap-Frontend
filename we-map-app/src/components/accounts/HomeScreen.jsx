// HomeScreen.js

import React from 'react';
import styled from 'styled-components';
import img1 from "../images/homemap.png";

const Container = styled.div`
  text-align: center;
`;

const BigTitle = styled.h1`
  color: black; 
  margin-top: 100px;
  & span1 {
    color: #0081C9; 
  }
`;

const SmallTitle = styled.h3`
  color: black; 
  & span2 {
    color: #0081C9; 
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
  background-color: #0081C9; 
  color: white;
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
    background-color: #0056b3;
  }
`;

const Button2 = styled.button`
  background-color: #D5D5D5; 
  color: white;
  padding: 10px 20px;
  font-size: 25px;
  font-weight: bold;
  margin-top: 10px;
  width: 25%;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  &:hover {
    background-color: #555; 
  }
`;

function HomeScreen() {
  return (
    <Container>
      <BigTitle>Welcome to <span1>WeMap</span1> !</BigTitle>
      <SmallTitle><span2>WeMap</span2>에 오신 것을 환영합니다.</SmallTitle>
      <Image src={img1} alt="WeMap 이미지" />
      <Buttons>
        <Button1>Get Started</Button1>
        <Button2>Log In</Button2>
      </Buttons>

    </Container>
  );
}

export default HomeScreen;
