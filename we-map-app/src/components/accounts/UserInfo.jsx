import React, { useContext } from 'react'
import styled from 'styled-components'
import colors from '../../Common/Color';
import profileIMG from '../../images/user_profile.png'
import { AuthContext } from '../../App';
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
  width: 96px;
  height: 96px;
  padding: 1%;
  border-radius: 50%;
  margin-top: 12%;
  margin-bottom: 7%;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    width: 86.35%;
    height: 100%;
  }
`;

const InfoBox = styled.div`
    width: 80%;
    height: 6%;
    padding: 2%;
    box-sizing: border-box;
    font-weight: 700;
    border : 1px solid #000;
    border-radius: 12px;
    margin-bottom: 2%;
`;
export default function UserInfo(props) {
  const moveHome = props.moveHome
  const {authState, setAuthState} = useContext(AuthContext);
  const handleLogout = async () =>{
    await logOut()
    moveHome()
  }
  return (
    <Container>
        <Title>
            <div
                style ={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: colors.mainBlue,
                    marginBottom: '2%',
                }}
            >개인정보 조회/수정</div>
            <div
                style = {{
                    fontSize: '12px',
                    color: colors.subGray,
                    fontWeight: 700,

                }}
            >개인정보를 수정해보세요.</div>
        </Title>
        <Line></Line>
        <Profile>
            <img src={profileIMG} alt="프로필 이미지" />
        </Profile>

        <InfoBox>ID(이메일) : {authState.userName}</InfoBox>
        <InfoBox>이름 : {authState.userName}</InfoBox>
        <InfoBox>비밀번호 수정</InfoBox>
        <InfoBox>재난 알림 설정 : </InfoBox>

        <div
            className='logoutWrapper'
            style ={{
                width: '80%',
                height: '4%',
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '3%',
            }}
        >
            <button
                style = {{
                    width: '32%',
                    heght: '100%',
                    borderRadius: '22px',
                    backgroundColor: colors.mainBlue,
                    color: colors.white,
                    border: 'none',
                    fontWeight: '700',
                    cursor: 'pointer',
                }}

                onClick={() =>{
                    refresh()
                  }
                }
            >수정하기</button>
        </div>

        <button
            style = {{
                width: '70%',
                height: '7%',
                border: 'none',
                fontSize: '24px',
                fontWeight: '700',
                borderRadius: '22px',
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
