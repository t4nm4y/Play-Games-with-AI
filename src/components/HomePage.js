import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../css/HomePage.module.css'
import "@fontsource/press-start-2p";

const TicTacToeCard = () => {
  const reactNavigator = useNavigate();

  function goto_ttt_ai() {
    reactNavigator('/ttt_ai');
  };

  function goto_ttt() {
    reactNavigator('/ttt');
  }
  function goto_cn4() {
    reactNavigator('/cn4');
  }
  function goto_cn4_ai() {
    reactNavigator('/cn4_ai');
  }
  function goto_cn4_ai_pruning() {
    reactNavigator('/cn4_ai_pruning');
  }
  function goto_othello() {
    reactNavigator('/othello');
  }
  function goto_temp() {
    reactNavigator('/temp');
  }

  return (
    <div className={style.main_wrapper}>
      <h2>Play Games with AI!</h2>
      <div className={style.card_wrapper}>
        <div className={style.card}>
          <h1>Tic<br />Tac<br />Toe</h1>
          <div className={style.btn_box}>
            <button className={style.play_btn} onClick={goto_ttt_ai}>AI</button>
            <button className={style.play_btn} onClick={goto_ttt}>Friend</button>
          </div>
        </div>
        <div className={style.card}>
          <h1>Connect&nbsp; 4</h1>
          <div className={style.btn_box}>
            <button className={style.play_btn} onClick={goto_cn4_ai}>AI</button>
            <button className={style.play_btn} onClick={goto_cn4}>Friend</button>
            <button className={style.play_btn} onClick={goto_cn4_ai_pruning}>Fast AI (Pruning)</button>
          </div>
        </div>
        <div className={style.card}>
          <h1>Othello</h1>
          <div className={style.btn_box}>
            <button className={style.play_btn} onClick={goto_othello}>AI</button>
            <button className={style.play_btn} onClick={goto_temp}>testing</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToeCard;
