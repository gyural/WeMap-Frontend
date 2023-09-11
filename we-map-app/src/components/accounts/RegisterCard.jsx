import React, {useState} from 'react'
import styled from "styled-components"
import kakao_signup from "../../images/kakao_signup.png"
import naver_signup from "../../images/naver_signup.png"
import { register } from '../../APIs/Auth'
import colors from '../../Common/Color'

const Container = styled.div`
    width: 310px;
    height: 500px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Input = styled.input`
    padding: 4px;
    font-size: 12px;
    display: block;
    width: 93%;
    height: 24%;
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

const TitleWrapper = styled.div`
  color: ${colors.mainBlue};
  font-size: 200%;
  font-weight: 700;
  margin-bottom: 8%;
`;

const Form = styled.form`
  width: 96%;
  height: 36%;
  display: block;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div`
    width: 88%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 4%;
    font-size: 140%;
`;

const Button = styled.button`
     display: 'block';
      width: 47%;
      height: 90%;
      color: ${props => props.color};
      font-size: 90%;
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
  background-color: #000000;
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


function RegisterCard(props) {
    const [formData, setFormData] = useState({
        id: "",
        password: "",
        check_password: "",
        email: "",
    });

    
    const handleSubmit = () => {
        if (formData.check_password === formData.password) {
            console.log(formData);
            if (register(formData.id, formData.password)) {
                // navigate("/signin");
                // alert('회원가입 성공!!!')
            }
        } else {
            alert("비밀번호가 일치하지 않습니다.");
        }
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
                color = '#fff'
                bgcolor = {colors.mainBlue}
                hoverColor = '#00476d'
                onClick = {
                  handleSubmit
                }
              >
              회원가입
              </Button>
              <Button
                color = '#fff'
                bgcolor = '#d2d2d2'
                
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
                height: '20%',
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
                        borderRadius: "12px",
                        marginBottom: "2%",
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
                        borderRadius: "12px",
                    }}
                ></a>
            </div>
        </Container>
    );
}

export default RegisterCard;
