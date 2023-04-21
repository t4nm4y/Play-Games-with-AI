import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import style from '../css/HomePage.module.css'
import "@fontsource/press-start-2p";
// import './TicTacToeCard.css';

const TicTacToeCard = () => {
  const reactNavigator = useNavigate();

  function goto_ttt_ai(){
    reactNavigator('/ttt_ai');
  };

  function goto_ttt(){
    reactNavigator('/ttt');
}
  function goto_cn4(){
    reactNavigator('/cn4');
}

  return (
    <div  className={style.main_wrapper}>
      <h2>Play Games with AI!</h2>
    <div className={style.card_wrapper}>
    <div className={style.card}>
      <h1>Tic<br/>Tac<br/>Toe</h1>
      <div className={style.btn_box}>
        <button className={style.play_btn} onClick={goto_ttt_ai}>AI</button>
        <button className={style.play_btn} onClick={goto_ttt}>Friend</button>
      </div>
    </div>
    <div className={style.card}>
      <h1>Connect 4</h1>
      <div className={style.btn_box}>
        <button className={style.play_btn} onClick={goto_cn4}>AI</button>
        <button className={style.play_btn} onClick={goto_cn4}>Friend</button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default TicTacToeCard;
