import { useState, useEffect } from 'react';
import styles from '../css/TicTacToe.module.css';
import { useNavigate } from 'react-router-dom';

const TicTacToe = () => {
    const reactNavigator = useNavigate();
    let [xp] = useState('X');
    let [op] = useState('O');
    let [currentPlayer, setCurrentPlayer] = useState(xp);
    let [board,setBoard] = useState(Array(9).fill(null));

    function resetBoard (){
        window.location.reload()
    }
    function leaveRoom(){
        reactNavigator('/');
    }

    function checkWinner () {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        let openSpots = 0;
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                openSpots++;
            }
        }
        if (openSpots === 0) {
            return 'tie';
        }
        return null;
    };

    function handleClick(index) {
        if (checkWinner()===null && board[index] == null) {
            const newBoard = board;
            newBoard[index] = currentPlayer;
            setBoard(newBoard);
            if(currentPlayer===xp) setCurrentPlayer(op);
            else setCurrentPlayer(xp);
        }
    };

    const winner = checkWinner();
    let status;
    if (winner === 'tie') {
        status = "Draw!";
    }else if (winner===xp) {
        status = "Winner: X";
    } else if (winner===op) {
        status = "Winner: O";
    }
    const renderStatus = () => {
        if(status)
        return(<div className={styles.status}>{status}</div>
        );
    }
    const renderSquare = (index) => {
        if(board[index]===xp){
        return (
            <div className={styles.square} onClick={() => handleClick(index)}>
                <span class={styles.line}></span>
                <span class={styles.line}></span>
            </div>
        );
        }
        else if(board[index]==op) {
            return (
                <div className={styles.square} onClick={() => handleClick(index)}>
                    <span class={styles.circle}></span>
                </div>
            ); 
        }
        else return <div className={styles.square} onClick={() => handleClick(index)}></div>
    };

    return (
        <div className={styles.container}>
            <div className={styles.navBar}>
                <button className={styles.btn} onClick={leaveRoom}>Home</button>
                <button className={styles.btn} onClick={resetBoard}>Reset</button>
            </div>
                <div className={styles.currP}>Current Player: {currentPlayer}</div>
            <div className={styles.board}>
            <div className={styles.board_vline1}></div>
            <div className={styles.board_vline2}></div>
            <div className={styles.board_hline1}></div>
            <div className={styles.board_hline2}></div>
            <div className={styles.board_row}>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className={styles.board_row}>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className={styles.board_row}>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <div>{renderStatus()}</div>
            </div>
        </div>
    );
};

export default TicTacToe;

