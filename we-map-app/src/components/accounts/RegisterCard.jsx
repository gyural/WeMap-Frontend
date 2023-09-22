import React, {useState} from 'react'
import styled from "styled-components"
import kakao_signup from "../../images/kakao_signup.png"
import naver_signup from "../../images/naver_signup.png"
import { register } from '../../APIs/Auth'
import colors from '../../Common/Color'

const Container = styled.div`
    padding-top: 30%;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
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

const TitleWrapper = styled.div`
  color: ${colors.mainBlue};
  font-size: 35px;
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
  margin-bottom: 7%;
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


function RegisterCard(props) {
    const handleMode = props.handleMode
    const moveHome = props.moveHome
    const [formData, setFormData] = useState({
        id: "",
        password: "",
        check_password: "",
        email: "",
    });

    
    const handleSubmit = async () => {
        if (formData.check_password === formData.password) {
            if (await register(formData.id, formData.password)) {
              alert("회원가입 완료!!")
              moveHome()
              }
        }else {
          alert("비밀번호가 일치하지 않습니다.");
    }};

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
            회원가입
          </TitleWrapper>
            <Form>
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
                <Input
                    type="password"
                    name="check_password"
                    placeholder="비밀번호를 재입력해주세요"
                    value={formData.check_password}
                    onChange={handleChange}
                />
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
              회원가입
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
            <div className="social-signup"
              style ={{
                width: '100%',
                height: '18%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
                <a
                    className="kakao-signup"
                    href="javascript:void(0)"
                    style={{
                        display: "block",
                        width: "90%",
                        height: "40%",
                        backgroundImage: `url(${kakao_signup})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        borderRadius: "15px",
                        marginBottom: "2.5%",
                    }}
                ></a>
                <a
                    className="naver-login"
                    href="javascript:void(0)"
                    style={{
                        display: "block",
                        width: "90%",
                        height: "40%",
                        backgroundSize: "cover",
                        backgroundImage: `url(${naver_signup})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        borderRadius: "15px",
                    }}
                ></a>
            </div>
        </Container>
    );
}

export default RegisterCard;
