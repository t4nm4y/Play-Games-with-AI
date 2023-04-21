import { useState, useEffect } from 'react';
import styles from '../css/Connect-4.module.css';
import { useNavigate } from 'react-router-dom';

const TicTacToe = () => {
    const reactNavigator = useNavigate();
    function leaveRoom(){
        reactNavigator('/');
    }

    return (
        <div className={styles.container}>
            <div className={styles.navBar}>
                <h1>Coming soon!</h1>
                <button className={styles.btn} onClick={leaveRoom}>Home</button>
            </div>
        </div>
    );
};

export default TicTacToe;

