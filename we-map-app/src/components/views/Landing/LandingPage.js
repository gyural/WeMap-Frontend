import React, { useState } from 'react';
import styled from 'styled-components';
import MapContainer from './Sections/MapContainer';
import '../../views/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import menuIcon from '../../../images/line.png';
import backIMG from '../../../images/left-arrow.png'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction :column;
  align-items: center;
`

const Exit = styled.div`
  width: 20
`
function LandingPage() {
  const [InputText, setInputText] = useState('');
  const [Place, setPlace] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onChange = (e) => {
    setInputText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(InputText);
    setInputText('');
  }

  const openMenuWindow = () => {
    // 메뉴 버튼을 누를 때 새 창 열기
    window.open('URL-OF-MENU-PAGE', '_blank');
  }

  return (
    <Container>
      <div className="landingPageContainer">
      <div className="searchContainer">
        <button className="menuButton" onClick={openMenuWindow}style={{ height: '80%', width: '5%' }}>
          <img src={menuIcon} alt="메뉴 아이콘" style={{ height: '100%', width: '100%' }} />
        </button>
        <form styled={{
          
        }}className="inputForm" onSubmit={handleSubmit}>
          <input className="searchInput" placeholder="" onChange={onChange} value={InputText} />
          <button className="searchButton" type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
      <div className="buttonContainer">
        
        <button className="Button1">실종</button>
        <button className="Button1">산사태</button>
        <button className="Button1">지진</button>
        <button className="Button1">호우</button>
        <button className="Button1">폭염</button>
        <button className="Button1">폭설</button>
        <button className="Button1">허리케인</button>
      </div>  
      
    <div className="mapContainer"style={{ width: '100%', height: '100%' }}>
          <MapContainer searchPlace={Place} />
    </div>
  </div>  
    </Container>
    
  )
}

export default LandingPage;
