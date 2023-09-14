
import React from 'react';
import styled from 'styled-components';
import colors from '../../Common/Color';
import backarrow from "../../images/left-arrow.png";
import redWarning from "../../images/red-warning.png";
import warning from "../../images/warning.png";
import safe from "../../images/check.png";

const Container = styled.div`
    padding-top: 20px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
`;

const Topbar = styled.div`
    width: 100%;
`;

const BackArrow = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    width: 20px;
    height: 20px;
`;

const Image = styled.img`
    width: 20px;
    height: 20px;
`;

const BigTitle = styled.h1`
    color: ${colors.mainBlue}; 
    font-size: 180%; 
    text-align: right;
    margin: 0;
`;

const SmallTitle = styled.h3`
    color: ${colors.subGray}; 
    font-size: 80%; 
    text-align: right;
`;

const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${colors.gray};
    content: "1";
`;

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
`;

const Button = styled.button`
    background-color: transparent;
    color: ${colors.black};
    border: none;
    width: 150px;
    height: 150px;
    cursor: pointer;
    font-size: 17px;
    font-weight: 700;
    text-shadow: 2px 4px 2px ${colors.gray};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:hover {
            transform: scale(1.3);
    }
    img{
        width: 65%;
        height: 60%;
        margin-bottom: 5%;
        filter: drop-shadow(4px 4px 2px ${colors.gray});
    }
`;

function EmergencyStep(props) {
    return (
        <Container>
            <Topbar>
                <BackArrow>
                    <Image src={backarrow} alt="뒤로가기 버튼"></Image>
                </BackArrow>
            </Topbar>
            <BigTitle>재난 알림 설정</BigTitle>
            <SmallTitle>
                위험 등급별 재난 알림 설정을 통해서
                <br />
                확인하고 싶은 재난의 알림을 받아보세요!
            </SmallTitle>
            <Line></Line>
            <Buttons>
                <Button>
                    <img src={redWarning} alt="위급 재난 아이콘" />
                    위급 재난 문자
                </Button>
                <Button>
                    <img src={warning} alt="긴급 재난 아이콘" />
                    긴급 재난 문자
                </Button>
                <Button>
                    <img src={safe} alt="안전 안내 아이콘" />
                    안전 안내 문자
                </Button>
            </Buttons>
        </Container>
    )
}

export default EmergencyStep;
