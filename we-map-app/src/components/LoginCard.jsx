import React, { useContext, useState } from "react";
import styled from "styled-components";
import image1 from "../images/kakao_signup.png"
import image2 from "../images/naver_signup.png"
import { login } from "../APIs/Auth";
import { AuthContext } from "../App";
import colors from "../Common/Color";


const Container = styled.div`
    width: 310px;
    height: 400px;
    padding: 4px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TitleWrapper = styled.div`
  color: ${colors.mainBlue};
  font-size: 200%;
  font-weight: 700;
  margin-bottom: 8%;
`;

const Input = styled.input`
    padding: 4px;
    font-size: 12px;
    display: block;
    width: 93%;
    height: 35%;
    margin-top: 3.8%;
    border: 1px solid #000;
    border-radius: 15px;
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
    width: 88%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 4%;
    font-size: 140%;
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
  background-color: #ccc;
  content: "1";
`;

const TextBox = styled.div`
  width: 80px;
  background-color: #fff;
  position: absolute;
  z-index: 1;
  text-align: center;
  left: 37%;
  bottom: -6px;
`;


function LoginCard(props) {

    const {authState, setAuthState} = useContext(AuthContext);
    const [formData, setFormData] = useState({
        id: "",
        password: "",
        isChecked: true,
    });
    const handleSubmit = () => {
        login(formData.id, formData.password).then(
            ()=>{
                setAuthState({
                  isLoggedIn: true,
                  userName: formData.id,
                })
                
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
                WeMap
            </TitleWrapper>
            <form
              style = {{
                width: '100%',
                height: '33%',
                display: 'block',
                marginBottom: '5%',
              }}
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
                        width: '100%',
                        height: '20%',
                        alignItems: 'center',
                    }}
                >
                    <input
                        type="checkbox"
                        name="isChecked"
                        checked={formData.isChecked}
                        onChange={handleChange}
                    />
                    <p>로그인 상태 유지</p>
                </div>
            </form>

            <ButtonWrapper
            >
              <button
                style = {{
                  display: 'block',
                  width: '44%',
                  height: '100%',
                  color: '#fff',
                  fontSize: '100%',
                  backgroundColor: colors.mainBlue,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '700',

                }}
              >
              로그인
              </button>
              <button
                style = {{
                  display: 'block',
                  width: '44%',
                  height: '100%',
                  color: '#fff',
                  fontSize: '100%',
                  backgroundColor: '#D2D2D2',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '700',

                }}
              >
              취소
              </button>  
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

              <div> 
                    계정이 없으신가요?
                </div>
                <div
                    style = {{
                        textDecoration: 'underline',
                        color: colors.mainBlue,
                        cursor: 'pointer',
                        marginLeft: '4%',
                           }}
                    // onClick = {handleMode}
                >
                    회원가입하기
                </div>
            
            </div>
        </Container>

    );
}

export default LoginCard;
