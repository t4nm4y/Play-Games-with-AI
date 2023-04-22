import { useState, useEffect } from 'react';
import styles from '../css/Othello.module.css';
import { useNavigate } from 'react-router-dom';

const Othello = () => {
    const reactNavigator = useNavigate();
    function leaveRoom(){
        reactNavigator('/');
    }
    return (
        <div className={styles.container}>
            <div className={styles.navBar}>
                <h1>Coming Soon...</h1>
                <button className={styles.btn} onClick={leaveRoom}>Home</button>
                {/* <button className={styles.btn} onClick={resetBoard}>Reset</button> */}
            </div>
        </div>
    );
};

export default Othello;

