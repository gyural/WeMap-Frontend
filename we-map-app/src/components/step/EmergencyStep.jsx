
import React, { useState, useContext } from 'react';
import Modal from 'react-modal';

import styled from 'styled-components';
import colors from '../../Common/Color';
import backarrow from "../../images/left-arrow.png";
import redWarning from "../../images/red-warning.png";
import warning from "../../images/warning.png";
import safe from "../../images/check.png";
import { AuthContext } from '../../App';
import '../../css/modal.css';
import { updateUserAuth } from '../../APIs/Auth';

const Container = styled.div`
    padding-top: 7%;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
`;

const Topbar = styled.div`
    width: 100%;
    padding-top: 3%;
`;

const BackArrow = styled.button`
    background-color: transparent;
    position: absolute;
    left: 5%;
    top: 6.85%;
    border: none;
    cursor: pointer;
    width: 20px;
    height: 20px;
`;

const Image = styled.img`
    width: 20px;
    height: 20px;
`;

const Title = styled.div`
    width: 100%;
    padding: 8% 0%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    height: 9%;
`;

const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${colors.gray};
    content: "1";
    margin-top: 3%;
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

const TitleSpan = styled.span`
    color: ${colors.red};
    font-size: 18px;
    font-weight: 700;
`;

const Span = styled.span`
    color: ${colors.mainBlue};
    font-size: 17px;
    font-weight: 700;
`;

const AlarmSpan = styled.span`
    font-size: 17px;
    font-weight: 700;
`;

const SelectButton = styled.div`
    width: 100%;
    margin-top: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

const YesButton = styled.button`
    background-color: ${colors.mainBlue};
    color: ${colors.white};
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 17px;
    font-weight: 700;
    width: 35%;
    &:hover {
        background-color: ${colors.hoverBlue};
    }
`;

const NoButton = styled.button`
    background-color: ${colors.gray};
    color: ${colors.white};
    border: none;
    border-radius: 20px;
    margin-left: 5%;
    cursor: pointer;
    font-size: 17px;
    font-weight: 700;
    width: 35%;
    &:hover {
        background-color: ${colors.hoverGray};
    }
`;

Modal.defaultStyles = {};

function EmergencyStep(props) {
    const moveUserInfo = props.moveUserInfo
    /** 유저 정보 */
    const {authState, setAuthState} = useContext(AuthContext);

    console.log(authState)
    const [modal1IsOpen, setModal1IsOpen] = useState(false);
    const [modal2IsOpen, setModal2IsOpen] = useState(false);
    const [modal3IsOpen, setModal3IsOpen] = useState(false);
    /**
     * 서버로 유저 재난 level를 Put 하는 명령어
     * @param {*} level 현재 열려있는 popup 넘버
     */
    const handleSubmit = async (level) =>{
        console.log('뭐지?')
        //Update API 요청
        await updateUserAuth({
            'email': authState.userName,
            'dis_level': level,
            'password': authState.password,
            'nickname' : authState.nickname
        })
        //Context에 반영
        setAuthState({
            isLoggedIn: true,
            userName: authState.userName,
            dis_level: level,
            nickname: authState.nickname,
            password: authState.password,
        })
        moveUserInfo()
    }
    return (
        <Container>
            <Topbar>
                <BackArrow onClick={moveUserInfo}>
                    <Image src={backarrow} alt="뒤로가기 버튼"></Image>
                </BackArrow>
            </Topbar>
            <Title>
            <div
                style ={{
                    fontSize: '180%',
                    fontWeight: 700,
                    color: colors.mainBlue,
                    marginBottom: '2%',
                }}
            >재난 알림 설정</div>
            <div
                style = {{
                    fontSize: '85%',
                    color: colors.subGray,
                    fontWeight: 700,
                    textAlign: 'right',
                    marginBottom: '3%',
                }}
            >위험 등급별 재난 알림 설정을 통해서
            <br />
            확인하고 싶은 재난의 알림을 받아보세요!</div>
        </Title>
            <Line></Line>
            <Buttons>
                <Button onClick={() => setModal1IsOpen(true)}>
                    <img src={redWarning} alt="위급 재난 아이콘" />
                    위급 재난 문자
                </Button>
                <Modal
                    isOpen={modal1IsOpen} 
                    onRequestClose={() => setModal1IsOpen(false)}
                >
                    <TitleSpan>위급 재난 문자</TitleSpan>
                        <p>
                            전쟁 상황에서 공급 경보 등의 발령 시 발송
                            <br/>
                            60dB 이상의 알림음
                            <br/>
                            수신거부 불가능
                        </p>
                        <Span>위급 재난 문자 종류</Span>
                        <p>공습경보, 경계경보, 화생방경보, 규모 6.0 이상의 지진</p>
                        <Line></Line>
                        <br />
                        <AlarmSpan>알림을 받으시겠습니까?</AlarmSpan>
                        <SelectButton>
                            <YesButton onClick={()=>{
                                handleSubmit(3)
                                }
                            }>
                                예</YesButton>
                            <NoButton>취소</NoButton>
                        </SelectButton>
                </Modal>
                    
                <Button onClick={() => setModal2IsOpen(true)}>
                    <img src={warning} alt="긴급 재난 아이콘" />
                    긴급 재난 문자
                </Button>
                <Modal 
                    isOpen={modal2IsOpen}
                    onRequestClose={() => setModal2IsOpen(false)}
                >
                    <TitleSpan>긴급 재난 문자</TitleSpan>
                    <p>
                        각종 재난 시 주민대피 상황을 알리거나 민방위 경계경보 발령용
                        <br/>
                        40dB의 보통 크기 알림음
                        <br/>
                        수신거부 가능
                    </p>
                    <Span>긴급 재난 문자 종류</Span>
                    <p>테러, 위험 물질 유출, 지진 및 해일, 화산, 홍수, 산불, 태풍 등 대피가 필요한 천재지변</p>
                    <Line></Line>
                    <br />
                    <AlarmSpan>알림을 받으시겠습니까?</AlarmSpan>
                    <SelectButton>
                        <YesButton onClick={()=>{
                                handleSubmit(2)
                                }
                            }
                        >예</YesButton>
                        <NoButton>취소</NoButton>
                    </SelectButton>
                </Modal>
                <Button onClick={() => setModal3IsOpen(true)}>
                    <img src={safe} alt="안전 안내 아이콘" />
                    안전 안내 문자
                </Button>
                <Modal
                    isOpen={modal3IsOpen}
                    onRequestClose={() => setModal3IsOpen(false)}
                >
                    <TitleSpan>안전 안내 문자</TitleSpan>
                    <p>
                        재난 유형에 따른 안전 정보 안내 목적
                        <br/>
                        일반 문자와 같은 크기의 알림음
                        <br/>
                        수신거부 가능
                    </p>
                    <Span>안전 안내 문자 종류</Span>
                    <p>폭염, 황사, 실종자 수색 문자</p>
                    <Line></Line>
                    <br />
                    <AlarmSpan>알림을 받으시겠습니까?</AlarmSpan>
                    <SelectButton>
                        <YesButton onClick={()=>{
                                handleSubmit(1)
                                }
                            }>예</YesButton>
                        <NoButton>취소</NoButton>
                    </SelectButton>
                </Modal>
            </Buttons>
        </Container>
    )
}

export default EmergencyStep;
