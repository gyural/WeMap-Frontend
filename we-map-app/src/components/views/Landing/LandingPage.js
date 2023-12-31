import React, { useState } from 'react';
import styled from 'styled-components';
import MapContainer from './Sections/MapContainer';
import '../../views/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import menuIcon from '../../../images/line.png';
import backIMG from '../../../images/left-arrow.png'
import FindShelter from './Sections/FindShelter';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction :column;
  align-items: center;
`;

function LandingPage(props) {
  const moveSideMenu = props.moveSideMenu
  const [InputText, setInputText] = useState('');
  const [Place, setPlace] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mode, setMode] = useState("disasterMap")
  const onChange = (e) => {
    setInputText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(InputText);
    setInputText('');
  }
  const handleMode = () =>{
    setMode("findShelter")
  }
  const openMenuWindow = () => {
    // 메뉴 버튼을 누를 때 새 창 열기
    window.open('URL-OF-MENU-PAGE', '_blank');
  }

  return (
    <Container>
      <div className="landingPageContainer">
      <div className="searchContainer">
        <button className="menuButton" onClick={moveSideMenu} style={{ height: '80%', width: '10%' }}>
          <img  src={menuIcon} alt="메뉴 아이콘" style={{ height: '100%', width: '100%' }} />
        </button>

      </div>

    <div className="mapContainer"style={{ width: '100%', height: '100%' }}>
      {mode === "disasterMap" ? (
          <MapContainer searchPlace={Place} handleMode={handleMode} />
        ) : mode === "findShelter" ? (
          <FindShelter />
        ) : null}
    </div>
  </div>  
    </Container>
    
  )
}

export default LandingPage;
