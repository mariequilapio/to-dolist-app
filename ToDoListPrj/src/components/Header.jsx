import React from 'react';
import header from '../assets/header.png';

function HeaderImage() {
  return (
    <div className="header-container" style={{ width: '100%' }}>
      <img 
        className="header"
        src={header} 
        alt="Header" 
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
}

export default HeaderImage;
