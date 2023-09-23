import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getPath } from './navigation';

const Button = styled.button`
  position: absolute;
  top: 12.5%;
  right: 10px;
  z-index: 10;
  padding: 10px 20px;
  background-color: #fff;
  border: none;
  border-radius: 15px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
`;

const StyledButton = styled.button`
  margin: 5px;
  padding: 20px 15px;
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
  top: 40%;
  left: 50%;
  display: grid;
  min-height: 2dvh;
  transform: translate(-50%, -50%);
  padding: 50px;
  width: 20%; 
  height: 50%; 
  border-radius: 12px;
  background-color: #fff;
  border: 1px solid #ddd;
  z-index: 1000;
  overflow-y: auto; 
  &::-webkit-scrollbar {
    display: none;
  }
`;

const LocationSelector = ({ onLocationSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSido, setSelectedSido] = useState(null);
  const [selectedGugun, setSelectedGugun] = useState(null);
  const [locationData, setLocationData] = useState({});

  const fetchSidoData = async () => {
    try {
      const response = await axios.get('https://f4e1b1y4g9.execute-api.ap-northeast-2.amazonaws.com/plz/sido');
      const parsedData = JSON.parse(response.data.body); // body 속성 파싱
      setLocationData({ sido: parsedData });
    } catch (error) {
      console.error("Error fetching sido data", error);
    }
  };

  const fetchLocationData = async (url, data) => {
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });

      const parsedData = JSON.parse(response.data.body); 
      return parsedData;
      } catch (error) {
      console.error("Error fetching location data", error);
    }
  };

  const handleSidoSelect = async (sido) => {
    setSelectedSido(sido);
    
    const sidoValue = locationData.sido[sido]; 
    const gugunData = await fetchLocationData('https://f4e1b1y4g9.execute-api.ap-northeast-2.amazonaws.com/plz/resion', { code: sidoValue.code });
    setLocationData(prevState => ({ ...prevState, gugun: gugunData }));
  };
  
  const handleGugunSelect = async (gugun) => {
    setSelectedGugun(gugun);
    const gugunValue = locationData.gugun[gugun]; 
    const dongData = await fetchLocationData('https://f4e1b1y4g9.execute-api.ap-northeast-2.amazonaws.com/plz/resion', { code: locationData.sido[selectedSido], gugun: gugunValue.code });
    setLocationData(prevState => ({ ...prevState, dong: dongData }));
  };
  
  const handleDongSelect = async (dong) => {
    const dongValue = locationData.dong[dong]; 
    const fullLocation = `${locationData.sido[selectedSido]} ${locationData.gugun[selectedGugun]} ${dongValue}`;
    const locationInfo = await fetchLocationData('https://f4e1b1y4g9.execute-api.ap-northeast-2.amazonaws.com/plz/resion', { code: fullLocation.code });
    onLocationSelect(locationInfo);
    setIsOpen(false);
  };
  
  

  useEffect(() => {
    fetchSidoData();
  }, []);


  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>지역 선택</Button>
      <ModalOverlay open={isOpen}>
        <ModalContainer>
          {!selectedSido && Object.keys(locationData.sido || {}).map(sido => (
            <StyledButton key={sido} onClick={() => handleSidoSelect(sido)}>
              {sido}
            </StyledButton>
          ))}
          {selectedSido && !selectedGugun && Object.keys(locationData.gugun || {}).map(gugun => (
            <StyledButton key={gugun} onClick={() => handleGugunSelect(gugun)}>
              {gugun}
            </StyledButton>
          ))}
          {selectedSido && selectedGugun && Object.keys(locationData.dong || {}).map(dong => (
            <StyledButton key={dong} onClick={() => handleDongSelect(dong)}>
              {dong}
            </StyledButton>
          ))}
          {selectedSido && (
            <StyledButton onClick={() => {
              if (selectedGugun) {
                setSelectedGugun(null);
              } else {
                setSelectedSido(null);
              }
            }}>이전</StyledButton>
          )}
        </ModalContainer>
      </ModalOverlay>
    </>
  );
}
export default LocationSelector;