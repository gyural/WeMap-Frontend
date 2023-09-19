import React, { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  position: absolute;
  font-weight: bold;
  top: 10px;
  right: 10px;
  z-index: 10;
  padding: 10px 20px;
  background-color: #fff;
  border: none;
  margin-top: 8%;
  border-radius: 5px;
  cursor: pointer;
`;

const StyledButton = styled.button`
  margin: 5px;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  background-color: #f5f5f5;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  display: ${props => props.open ? 'block' : 'none'};
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 300px;
  background-color: #fff;
  border: 1px solid #ddd;
  z-index: 1000;
`;

const data = {
  "부산광역시": {
    "기장군": ["장안읍", "철마면"],
    "부산진구": ["연지동"]
    //... 다른 구/군 및 읍/면/동 데이터 추가
  },
  "서울특별시": {
    "서대문구": ["천연동", "홍제1동"]
  },
  "대구광역시": {
    "북구": ["국우동"]
  }
  //... 다른 시/도 데이터 추가
};

const LocationSelector = ({ onLocationSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSido, setSelectedSido] = useState(null);
  const [selectedGugun, setSelectedGugun] = useState(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSidoSelect = (sido) => {
    setSelectedSido(sido);
  };

  const handleGugunSelect = (gugun) => {
    setSelectedGugun(gugun);
  };

  const handleLocationFinalSelect = (location) => {
    onLocationSelect(`${selectedSido} ${selectedGugun} ${location}`);
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={handleClick}>지역 선택</Button>
        
      <ModalOverlay open={isOpen}>
        <ModalContainer>
          
          {selectedSido && (
            <StyledButton onClick={() => {
              if (selectedGugun) {
                setSelectedGugun(null);
              } else {
                setSelectedSido(null);
              }
            }}>이전</StyledButton>
          )}

  
          {!selectedSido && Object.keys(data).map(sido => (
            <StyledButton key={sido} onClick={() => handleSidoSelect(sido)}>
              {sido}
            </StyledButton>
          ))}
  
          {selectedSido && !selectedGugun && Object.keys(data[selectedSido]).map(gugun => (
            <StyledButton key={gugun} onClick={() => handleGugunSelect(gugun)}>
              {gugun}
            </StyledButton>
          ))}
  
          {selectedSido && selectedGugun && data[selectedSido][selectedGugun].map(location => (
            <StyledButton key={location} onClick={() => handleLocationFinalSelect(location)}>
              {location}
            </StyledButton>
          ))}
     
        </ModalContainer>
      </ModalOverlay>
    </>
  );
}  

export default LocationSelector;
