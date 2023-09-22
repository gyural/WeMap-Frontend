import React, { useContext } from 'react'
import styled from 'styled-components'
import colors from '../../Common/Color';
import profileIMG from '../../images/user_profile.png'
import { AuthContext } from '../../App';
import backarrow from "../../images/left-arrow.png";

import { getUserAuth, logOut, refresh } from '../../APIs/Auth';
const Container = styled.div`
    width: 100%;
    height: 100%;
    padding-top: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
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
    background-color: #B0B0B0;
`;

const Profile = styled.div`
    width: 30%;
    height: 17%;
    padding: 2%;
    border-radius: 50%;
    margin: 5% 0;
    border: 1px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        width: 75%;
    }
`;

const InfoBox = styled.div`
    width: 95%;
    height: 6%;
    padding: 2%;
    box-sizing: border-box;
    border : 1px solid #000;
    border-radius: 12px;
    margin-bottom: 3%;
    font-size: 14.5px;
    span {
        font-weight: 700;
        margin: 0 2%;
    }
`;

const Topbar = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2%;
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

export default function UserInfo(props) {
    const moveHome = props.moveHome
    const moveSideMenu = props.moveSideMenu
    const moveEmergencyStep = props.moveEmergencyStep
    const {authState, setAuthState} = useContext(AuthContext);
    const disasterLevel = ['안전안내문자', '긴급 재난 문자', '위급 재난 문자']
    const handleLogout = async () =>{
        await logOut()
        moveHome()
    }
    return (
    <Container>
        <Topbar>
            <BackArrow onClick={moveSideMenu}>
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
            >개인정보 조회/수정</div>
            <div
                style = {{
                    fontSize: '85%',
                    color: colors.subGray,
                    fontWeight: 700,

                }}
            >개인정보를 수정해보세요.</div>
        </Title>
        <Line></Line>
        <Profile>
            <img src={profileIMG} alt="프로필 이미지" />
        </Profile>

        <InfoBox>
            <span>ID(이메일) :</span> {authState.userName}
        </InfoBox>
        <InfoBox>
            <span>이름 :</span> {authState.userName}
        </InfoBox>
        <InfoBox>
            <span>비밀번호 수정</span>
        </InfoBox>
        <InfoBox 
            onClick={moveEmergencyStep}
            style = {{cursor: 'pointer'}}
        >
            <span>재난 알림 설정 :</span> {disasterLevel[authState.dis_level - 1]}
        </InfoBox>

        <div
            className='logoutWrapper'
            style ={{
                width: '93%',
                height: '4%',
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '3%',
            }}
        >
            <button
                style = {{
                    width: '30%',
                    heght: '100%',
                    borderRadius: '18px',
                    backgroundColor: colors.mainBlue,
                    color: colors.white,
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                }}

            >수정하기</button>
        </div>

        <button
            style = {{
                width: '60%',
                height: '6%',
                border: 'none',
                fontSize: '20px',
                fontWeight: '700',
                borderRadius: '18px',
                color: colors.white,
                backgroundColor: colors.gray,
                marginTop: '2%',
                cursor: 'pointer',
            }}
            onClick={handleLogout}
        >
            로그아웃
        </button>
    </Container>
    )
}
