import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getPath } from './navigation';

const Button = styled.button`
  position: absolute;
  top: 13%;
  right: 10px;
  z-index: 10;
  padding: 10px 20px;
  background-color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const StyledButton = styled.button`
  margin: 5px;
  padding: 8px 15px;
  column-gap: 20px;

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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  min-height: 2dvh;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 20%; 
  height: 50%; 
  border-radius: 12px;
  background-color: #fff;
  border: 1px solid #ddd;
  z-index: 1000;
  overflow-y: auto; 
  ::-webkit-scrollbar {
    display: none;
  }
  
`;

const LocationSelector = ({ onLocationSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSido, setSelectedSido] = useState(null);
  const [selectedGugun, setSelectedGugun] = useState(null);
  const [locationData, setLocationData] = useState({});

  const handleClick = async () => {
    try {
      const response = await axios.get('https://q59cs7kvf3.execute-api.ap-northeast-2.amazonaws.com/plz/getCode', {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
      // console.log(response.data)
      // API 응답 데이터를 locationData 상태에 저장
      setLocationData(response.data.body);
      
  
    } catch (error) {
      console.error("Error sending POST request", error);
    }
  
    setIsOpen(!isOpen);
  };
  
 

  

  const handleSidoSelect = (sido) => {
    setSelectedSido(sido);
    setSelectedGugun(null);
  };

  const handleGugunSelect = (gugun) => {
    setSelectedGugun(gugun);
  };

  const handleLocationFinalSelect = (dong) => {
    onLocationSelect(`${selectedSido} ${selectedGugun} ${dong}`);
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={handleClick}>지역 선택</Button>
        
      <ModalOverlay open={isOpen}>
        <ModalContainer>
          {!selectedSido && Object.keys(locationData).map(sido => (
            <StyledButton key={sido} onClick={() => handleSidoSelect(sido)}>
              {sido}
            </StyledButton>
          ))}

          {selectedSido && !selectedGugun && Object.keys(locationData[selectedSido]?.군구 || {}).map(gugun => (
            <StyledButton key={gugun} onClick={() => handleGugunSelect(gugun)}>
              {gugun}
            </StyledButton>
          ))}

          {selectedSido && selectedGugun && Object.keys(locationData[selectedSido]?.군구[selectedGugun]?.읍면동 || {}).map(dong => (
            <StyledButton key={dong} onClick={() => handleLocationFinalSelect(dong)}>
              {dong}
            </StyledButton>
          ))}

          {selectedSido && (
            <StyledButton onClick={() => {
              if (selectedGugun) {
                setSelectedGugun(null);
              } else if (selectedSido) {
                setSelectedSido(null);
              } else {
                setIsOpen(false);
              }
            }}>이전</StyledButton>
          )}
        </ModalContainer>
      </ModalOverlay>
    </>
  );
}
export default LocationSelector;