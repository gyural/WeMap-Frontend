import React, { useContext, useState } from "react";
import styled from "styled-components";
import image1 from "../../images/kakao_signup.png"
import image2 from "../../images/naver_signup.png"
import { getUserAuth, login } from "../../APIs/Auth";
import { AuthContext } from "../../App";
import colors from "../../Common/Color";

import msg from "../../images/emergency-message.png";


const Container = styled.div`
    padding-top: 33%;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Image = styled.img`
    width: 70px;
    height: 70px;
    margin: 3%;
    z-index: 2;
`;

const TitleWrapper = styled.div`
  color: ${colors.mainBlue};
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 96%;
  height: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3px;
`;

const Input = styled.input`
    padding: 15px;
    font-size: 12px;
    display: block;
    width: 93%;
    height: 30%;
    margin-top: 3.3%;
    border: 1px solid #000;
    border-radius: 18px;
    box-sizing: border-box;
    &:focus {
      outline: none;
      border: 2px solid #000;
    }
    &::placeholder {
        font-weight: 700;
    }
`;

const ButtonWrapper = styled.div`
    width: 80%;
    height: 11%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 4%;
    font-size: 140%;
`;

const Button = styled.button`
      display: 'block';
      width: 43%;
      height: 70%;
      color: ${props => props.color};
      font-size: 18px;
      background-color: ${props => props.bgcolor};
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      border-radius: 12px;
      font-weight: 700;
      cursor: pointer;
      &:hover{
        background-color: ${props => props.hoverColor}
      }
`;

const DivideWrapper = styled.div`
  position: relative;
  height: 4px;
  width: 100%;
  margin-bottom: 24px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.black};
  content: "1";
`;

const TextBox = styled.div`
  width: 80px;
  background-color: ${colors.white};
  position: absolute;
  z-index: 1;
  text-align: center;
  left: 37%;
  bottom: -6px;
  font-size: 14px;
`;


function LoginCard(props) {
    const handleMode = props.handleMode;
    const moveHome = props.moveHome
    const moveMap = props.moveMap
    const moveUserInfo = props.moveUserInfo
    const {authState, setAuthState} = useContext(AuthContext);
    const [formData, setFormData] = useState({
        id: "",
        password: "",
        isChecked: true,
    });
    const handleSubmit = () => {
        login(formData.id, formData.password).then(
              async (res)=>{
                if(res === undefined){
                  alert('로그인 실패')
                }
                else{

                  // const res = await getUserAuth()
                  // const userInfo = res.data
                  setAuthState({
                    isLoggedIn: true,
                    userName: formData.id,
                    dis_level: 1,
                    nickname: formData.id,
                    password: 'test',
                    update_at: 'test',
                  })
                  moveMap()
                }
                
            }
        ).catch(
            ()=>{
                /**
                팝업 메시지 띄우기
                 */
                alert('ID / Pw를 확인해주세요!!');
            }
        )
    };

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === "isChecked") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: checked,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    return (
        <Container>

            <TitleWrapper>
              <Image src={msg} alt="WeMap 로고"></Image>
                WeMap
            </TitleWrapper>
            <Form
              
            >
                <Input
                    type="text"
                    name="id"
                    value={formData.id}
                    placeholder="이메일을 입력해주세요"
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력해주세요"
                    value={formData.password}
                    onChange={handleChange}
                />

                <div
                    className="login-state"
                    style={{
                        display: "flex",
                        width: '90%',
                        height: '20%',
                        alignItems: 'center',
                        marginTop: '1.3%',
                    }}
                >
                    <input
                        type="checkbox"
                        name="isChecked"
                        checked={formData.isChecked}
                        onChange={handleChange}
                    />
                    <p
                      style ={{
                        fontSize: '14px',
                      }}
                    >
                      로그인 상태 유지
                    </p>
                </div>
            </Form>

            <ButtonWrapper
            >
              <Button
                color = {colors.white}
                bgcolor = {colors.mainBlue}
                hoverColor = {colors.hoverBlue}
                onClick = {
                  handleSubmit
                }
              >
              로그인
              </Button>
              <Button
                color = {colors.white}
                bgcolor = {colors.gray}
                hoverColor = {colors.hoverGray}
                onClick = {
                  moveHome
                }
              >
              취소
              </Button>  
            </ButtonWrapper>

            <DivideWrapper>
              <Line></Line>
              <TextBox>또는</TextBox>
            </DivideWrapper>
            
            <div
              className = "signup-navigator"
              style ={{
                width: '100%',
                display: 'flex',
                fontWeight: '700',
              }}
            >

              <div
                style = {{
                  marginLeft: '4%',
                  fontSize: '14px',
                }}
              > 
                    계정이 없으신가요?
                </div>
                <div
                    style = {{
                        textDecoration: 'underline',
                        color: colors.mainBlue,
                        cursor: 'pointer',
                        marginLeft: '2%',
                        fontSize: '14px',
                      }}
                    onClick = {handleMode}
                >
                    회원가입하기
                </div>
            
            </div>
        </Container>

    );
}

export default LoginCard;
