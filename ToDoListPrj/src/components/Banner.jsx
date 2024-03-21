import React from 'react';
import allImage from '../assets/all.png';
import todayTaskImage from '../assets/todaytask.png';
import completedImage from '../assets/completed.png';
import uncompletedImage from '../assets/uncompleted.png';

function Banner({ filter }) {
  let imageUrl = allImage; // Default image

  // Determine the image URL based on the filter
  switch (filter) {
    case 'today':
      imageUrl = todayTaskImage;
      break;
    case 'completed':
      imageUrl = completedImage;
      break;
    case 'uncompleted':
      imageUrl = uncompletedImage;
      break;
    default:
      imageUrl = allImage;
      break;
  }

  return (
    <div className="empty-image-container">
      <img 
        src={imageUrl} 
        alt="Empty image" 
        className="empty-image"
      />
    </div>
  );
}

export default Banner;
