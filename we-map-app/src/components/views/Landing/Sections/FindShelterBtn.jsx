import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../../../Common/Color';
import locationData from '../../../../locationData.json';
import { getPath } from './navigation';

const Button = styled.button`
    position: absolute;
    top: 5.5%;
    right: 10px;
    z-index: 10;
    padding: 10px 20px;
    background-color: ${colors.mainBlue};
    color : ${colors.white};
    border: none;
    border-radius: 10px;
    cursor: pointer;
`;


const FindShelterBtn = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = props.handleClick

return (
    <>
    <Button onClick={handleClick}>내 주변 대피소 찾기</Button>
    </>
);
}
export default FindShelterBtn;