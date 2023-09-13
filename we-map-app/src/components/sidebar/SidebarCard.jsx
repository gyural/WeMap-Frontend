import styled from "styled-components";
import colors from "../../Common/Color";

const Container = styled.div`
    padding-top: 80px;
    width: 100%;
    height: 100%;
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

function SidebarCard(props) {

    return (
        <Container>

            <TitleWrapper>
                WeMap
            </TitleWrapper>

        </Container>
    );        
}

export default SidebarCard;
