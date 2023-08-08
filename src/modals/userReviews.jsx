import React from 'react';

const RateUsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; 

  return (
    <div className="modalOverlay">
      <div className="modalContent">        
        <h2>Valóranos</h2>
        <p>¡Tu opinión es valiosa!</p>
        <div className='containerbntReviews'>
       <button className='buttonModalReviews' onClick={onClose}>Close</button>
     </div>
      </div>
    </div>
  );
};

export default RateUsModal;