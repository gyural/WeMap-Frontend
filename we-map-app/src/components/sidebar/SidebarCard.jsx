
import React from 'react';
import styled from "styled-components";
import colors from "../../Common/Color";

import backarrow from "../../images/left-arrow.png";
import typhoon from "../../images/hurricane.png";
import forestFire from "../../images/forest-fire.png";
import landslide from "../../images/landslide.png";
import flood from "../../images/flood.png";
import heavyRain from "../../images/heavy-rain.png";
import hot from "../../images/hot.png";
import fog from "../../images/fog.png";
import heavySnow from "../../images/heavy-snow.png";
import earthquake from "../../images/earthquake.png";
import tsunami from "../../images/tsunami.png";
import yellowDust from "../../images/yellow-dust.png";
import fire from "../../images/fire.png";
import carAccident from "../../images/accident.png";
import missing from "../../images/missing.png";
import { useContext } from 'react';
import { AuthContext } from '../../App';
import { logOut } from '../../APIs/Auth';
const Container = styled.div`
    padding-top: 10%;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Topbar = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BackArrow = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    width: 20px;
    height: 20px;
`;

const LoginBtn = styled.button`
    background-color: ${colors.mainBlue};
    color: ${colors.white};
    border: 1px solid ${colors.mainBlue};
    border-radius: 10px;
    width: 70px;
    margin-left: 43%;
    margin-right: 5px;
    cursor: pointer;
    &:hover {
        background-color: ${colors.hoverBlue};
    }
`;

const InfoBtn = styled.button`
    background-color: ${colors.white};
    color: ${colors.black};
    border: 1px solid ${colors.black};
    border-radius: 10px;
    width: 70px;
    margin-right: 5px;
    cursor: pointer;
    &:hover {
        background-color: ${colors.black};
        color: ${colors.white};
    }
`;

const Image = styled.img`
    width: 20px;
    height: 20px;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    cursor: pointer;
    margin-top: 4%;
    width: 90%;
    height: 85%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
    width: 6px;
    }
    &::-webkit-scrollbar-track {
    background: #F1F1F1;
    }
    &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
    }
`;

const CommunityBtn = styled.button`
    background-color: ${colors.subBlue};
    color: ${colors.white};
    border: none;
    border-radius: 10px;
    width: 280px;
    font-size: 20px;
    margin-top: 5%;
    cursor: pointer;
    &:hover {
        background-color: ${colors.hoverBlue};
    }
`;

const Button = styled.button`
    background-color: ${colors.white};
    color: ${colors.black};
    border: 3px solid ${colors.mainBlue};
    border-radius: 20px;
    width: 133px;
    height: 133px;
    margin: 2%;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:hover {
        background-color: ${colors.mainBlue};
        color: ${colors.white};
    }
    img{
        width: 65%;
        height: 60%;
    }
`;

const MissingBtn = styled.button`
    background-color: ${colors.white};
    color: ${colors.black};
    border: 3px dashed ${colors.yellow};
    border-radius: 20px;
    width: 133px;
    height: 133px;
    margin: 2%;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:hover {
        background-color: ${colors.yellow};
        color: ${colors.white};
    }
    img{
        width: 65%;
        height: 60%;
    }
`;



function SidebarCard(props) {
    /**
     * 유저정보입니다
     */
    const {authState, setAuthState} = useContext(AuthContext);
    const isLogin = authState.isLoggedIn;
    const moveMap = props.moveMap
    const moveHome = props.moveHome
    const moveUserInfo = props.moveUserInfo
    /**
     * logout후 home화면으로 이동시키는 함수
     */
    const handleLogout = async () =>{
        await logOut()
        moveHome()
      }
    return (
        <Container>
            <Topbar>
                <BackArrow onClick={moveMap}>
                    <Image src={backarrow} alt="뒤로가기 버튼"></Image>
                </BackArrow>
                <LoginBtn onClick={handleLogout}>로그아웃</LoginBtn>
                <InfoBtn onClick={moveUserInfo}>내 정보</InfoBtn>
            </Topbar>
            <CommunityBtn>커뮤니티</CommunityBtn>
            <Buttons>
                <Button>
                    <img src={typhoon} alt="태풍 이미지"></img>
                    태풍
                </Button>
                <Button>
                    <img src={forestFire} alt="산불 이미지"></img>
                    산불
                </Button>
                <Button>
                    <img src={landslide} alt="산사태 이미지"></img>
                    산사태
                </Button>
                <Button>
                    <img src={flood} alt="홍수 이미지"></img>
                    홍수
                </Button>
                <Button>
                    <img src={heavyRain} alt="호우 이미지"></img>
                    호우
                </Button>
                <Button>
                    <img src={hot} alt="폭염 이미지"></img>
                    폭염
                </Button>
                <Button>
                    <img src={fog} alt="안개 이미지"></img>
                    안개
                </Button>
                <Button>
                    <img src={heavySnow} alt="대설 이미지"></img>
                    대설
                </Button>
                <Button>
                    <img src={earthquake} alt="지진 이미지"></img>
                    지진
                </Button>
                <Button>
                    <img src={tsunami} alt="해일 이미지"></img>
                    해일
                </Button>
                <Button>
                    <img src={yellowDust} alt="황사 이미지"></img>
                    황사
                </Button>
                <Button>
                    <img src={fire} alt="화재 이미지"></img>
                    화재
                </Button>
                <Button>
                    <img src={carAccident} alt="교통사고 이미지"></img>
                    교통사고
                </Button>
                <MissingBtn>
                    <img src={missing} alt="실종 이미지"></img>
                    실종
                </MissingBtn>
            </Buttons>
        </Container>
    );        
}

export default SidebarCard;
