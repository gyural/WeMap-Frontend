import React, { useState } from 'react';
import styled from 'styled-components';
import locationData from '../../../../locationData.json';
import { getPath } from './navigation';
const Button = styled.button`
  position: absolute;
  top: 10px;
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

const LocationSelector = ({ onLocationSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSido, setSelectedSido] = useState(null);
  const [selectedGugun, setSelectedGugun] = useState(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSidoSelect = (sido) => {
    setSelectedSido(sido);
    setSelectedGugun(null);
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
          {locationData.map(entry => {
            const 병합_코드 = String(entry.병합_코드);
            const locationName = entry.병합_명칭;
            if (!selectedSido) {
              if (병합_코드.length === 2) {
                return (
                  <StyledButton key={locationName} onClick={() => handleSidoSelect(locationName)}>
                    {locationName}
                  </StyledButton>
                );
              }
            } else if (selectedSido && !selectedGugun) {
              if (병합_코드.length === 5) {
                return (
                  <StyledButton key={locationName} onClick={() => handleGugunSelect(locationName)}>
                    {locationName}
                  </StyledButton>
                );
              }
            } else if (selectedSido && selectedGugun) {
                return (
                  <StyledButton key={locationName} onClick={() => handleLocationFinalSelect(locationName)}>
                    {locationName}
                  </StyledButton>
                );
            }
            return null;
          })}

          <StyledButton onClick={() => {
            if (selectedGugun) {
              setSelectedGugun(null);
            } else if (selectedSido) {
              setSelectedSido(null);
            } else {
              setIsOpen(false);
            }
          }}>이전</StyledButton>

        </ModalContainer>
      </ModalOverlay>
    </>
  );
}

export default LocationSelector;