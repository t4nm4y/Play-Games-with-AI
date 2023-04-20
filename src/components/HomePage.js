import React, { useState } from 'react';
// import './TicTacToeCard.css';

const TicTacToeCard = () => {
  const [showButtons, setShowButtons] = useState(false);

  const handleHover = () => {
    setShowButtons(true);
  };

  const handleLeave = () => {
    setShowButtons(false);
  };

  return (
    <div className="card" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
      <h1 className={showButtons ? 'hide' : ''}>Tic Tac Toe</h1>
      <div className={`neon-box ${showButtons ? 'show' : ''}`}>
        <button className="play-btn">Play with AI</button>
        <button className="play-btn">Play with Friend</button>
      </div>
    </div>
  );
};

export default TicTacToeCard;
