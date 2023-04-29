import { useState } from 'react';
import styles from '../css/Connect-4.module.css';
import { useNavigate } from 'react-router-dom';

const Connect4 = () => {
    const reactNavigator = useNavigate();
    let [p1] = useState(1);
    let [p2] = useState(2);
    let [currentPlayer, setCurrentPlayer] = useState(p1);
    let w = 7;
    let h = 6;
    const [board, setBoard] = useState([
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ]);

    function resetBoard() {
        window.location.reload()
    }
    function leaveRoom() {
        reactNavigator('/');
    }

    function p(y, x) {
        return (y < 0 || x < 0 || y >= h || x >= w) ? 0 : board[y][x];
    }

    function checkWinner() { //loops through rows, columns, diagonals
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                if (p(y, x) != 0 && p(y, x) == p(y, x + 1) && p(y, x) == p(y, x + 2) && p(y, x) == p(y, x + 3)) {
                    return p(y, x);
                }
                if (p(y, x) != 0 && p(y, x) == p(y + 1, x) && p(y, x) == p(y + 2, x) && p(y, x) == p(y + 3, x)) {
                    return p(y, x);
                }
                for (var d = -1; d <= 1; d += 2) {
                    if (p(y, x) != 0 && p(y, x) == p(y + 1 * d, x + 1) && p(y, x) == p(y + 2 * d, x + 2) && p(y, x) == p(y + 3 * d, x + 3)) {
                        return p(y, x);
                    }
                }
            }
        }
        for (let y = 0; y < h; y++)
            for (let x = 0; x < w; x++)
                if (p(y, x) == 0) return 0; //no winner yet and not tie
        return -1; //tie
    }

    function nextSpace(x) { //finds the next space (from the bottom)
        for (let y = h - 1; y >= 0; y--) {
            if (board[y][x] === 0) {
                return y;
            }
        }
        return -1;
    }

    function handleClick(i,j) {
        if (checkWinner() === 0) {
            i=nextSpace(j);
            if(i<0) return null;
            const newBoard = [...board];
            newBoard[i][j] = currentPlayer;
            setBoard(newBoard);
            if (currentPlayer === p1) setCurrentPlayer(p2);
            else setCurrentPlayer(p1);
        }
    };

    const winner = checkWinner();
    let status;
    if (winner === -1) {
        status = "Draw!";
    } else if (winner === p1) {
        status = "Winner: Player1";
    } else if (winner === p2) {
        status = "Winner: Player2";
    }
    const renderStatus = () => {
        if (status){
        if (winner === p1){
            return (<div className={styles.status}>
                <div className={styles.status_wrap}>
                Winner: <span className={styles.status_p1}></span>
                </div>
                </div>
            );
        }
        else if (winner === p2){
        return (<div className={styles.status}>
            <div className={styles.status_wrap}>
            Winner: <span className={styles.status_p2}></span>
            </div>
            </div>
        );
        }
        else return (<div className={styles.status}>
            <div className={styles.status_wrap}>
            Draw
            </div>
            </div>
        );
        }
    }
    const renderCircle = (i, j) => {
        if (board[i][j] === p1) {
            return (
                <div className={styles.square} onClick={() => handleClick(i,j)}>
                    <span className={styles.circle_p1}></span>
                </div>
            );
        }
        else if (board[i][j] == p2) {
            return (
                <div className={styles.square} onClick={() => handleClick(i,j)}>
                    <span className={styles.circle_p2}></span>
                </div>
            );
        }
        else return <div className={styles.square} onClick={() => handleClick(i,j)}></div>
    };

    const renderCurrPlayer=()=>{
        if (currentPlayer === p1){
            return(
                <span className={styles.p1}></span>
            )
        }
        else return(
            <span className={styles.p2}></span>
        )
    }
    return (
        <div className={styles.container}>
            <div className={styles.navBar}>
                <button className={styles.btn} onClick={leaveRoom}>Home</button>
                <button className={styles.btn} onClick={resetBoard}>Reset</button>
            </div>
            
            <div className={styles.board}>
                <div className={styles.board_vline}></div>
                <div className={styles.board_vline}></div>
                <div className={styles.board_vline}></div>
                <div className={styles.board_vline}></div>
                <div className={styles.board_vline}></div>
                <div className={styles.board_vline}></div>
                <div className={styles.board_vline}></div>
                <div className={styles.board_vline}></div>

                <div className={styles.board_hline}></div>
                <div className={styles.board_hline}></div>
                <div className={styles.board_hline}></div>
                <div className={styles.board_hline}></div>
                <div className={styles.board_hline}></div>
                <div className={styles.board_hline}></div>
                <div className={styles.board_hline}></div>
                
                <div className={styles.board_row}>
                    {renderCircle(0, 0)}
                    {renderCircle(0, 1)}
                    {renderCircle(0, 2)}
                    {renderCircle(0, 3)}
                    {renderCircle(0, 4)}
                    {renderCircle(0, 5)}
                    {renderCircle(0, 6)}
                </div>
                <div className={styles.board_row}>
                    {renderCircle(1, 0)}
                    {renderCircle(1, 1)}
                    {renderCircle(1, 2)}
                    {renderCircle(1, 3)}
                    {renderCircle(1, 4)}
                    {renderCircle(1, 5)}
                    {renderCircle(1, 6)}
                </div>
                <div className={styles.board_row}>
                    {renderCircle(2, 0)}
                    {renderCircle(2, 1)}
                    {renderCircle(2, 2)}
                    {renderCircle(2, 3)}
                    {renderCircle(2, 4)}
                    {renderCircle(2, 5)}
                    {renderCircle(2, 6)}
                </div>
                <div className={styles.board_row}>
                    {renderCircle(3, 0)}
                    {renderCircle(3, 1)}
                    {renderCircle(3, 2)}
                    {renderCircle(3, 3)}
                    {renderCircle(3, 4)}
                    {renderCircle(3, 5)}
                    {renderCircle(3, 6)}
                </div>
                <div className={styles.board_row}>
                    {renderCircle(4, 0)}
                    {renderCircle(4, 1)}
                    {renderCircle(4, 2)}
                    {renderCircle(4, 3)}
                    {renderCircle(4, 4)}
                    {renderCircle(4, 5)}
                    {renderCircle(4, 6)}
                </div>
                <div className={styles.board_row}>
                    {renderCircle(5, 0)}
                    {renderCircle(5, 1)}
                    {renderCircle(5, 2)}
                    {renderCircle(5, 3)}
                    {renderCircle(5, 4)}
                    {renderCircle(5, 5)}
                    {renderCircle(5, 6)}
                </div>
                <div>{renderStatus()}</div>
            </div>
            <div className={styles.currP}>Current Player: {renderCurrPlayer()}</div>
        </div>
    );
};

export default Connect4;

