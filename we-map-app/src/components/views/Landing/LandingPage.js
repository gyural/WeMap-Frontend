
import React, { useState } from 'react';
import MapContainer from './Sections/MapContainer';
import '../../views/styles.css';

function LandingPage() {
  const [InputText, setInputText] = useState('');
  const [Place, setPlace] = useState('');

  const onChange = (e) => {
    setInputText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(InputText);
    setInputText('');
  }

  return (
    <div className="landingPageContainer"> {}
      
      <div className="searchContainer">
        <form className="inputForm" onSubmit={handleSubmit}>
          <input className="searchInput" placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} />
          <button className="searchButton" type="submit">검색</button>
        </form>
      </div>
      <div className="mapContainer" style={{ width: '100%', height: '80vh' }}> {}
        <MapContainer searchPlace={Place} />
      </div>
    </div>
  )
}

export default LandingPage;
