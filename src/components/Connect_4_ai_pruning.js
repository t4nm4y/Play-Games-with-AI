import { useState, useEffect } from 'react';
import styles from '../css/Connect-4.module.css';
import { useNavigate } from 'react-router-dom';

import '../css/Menu.css';
import { CSSTransition } from "react-transition-group";

const Connect4_ai_pruning = () => {
// let depth=5;
    const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const [depth, setDifficulty] = useState(5);
  const handleDifficultyChange = (e) => {
    const val = parseInt(e.target.value);
    setDifficulty(val);
  };

    const reactNavigator = useNavigate();
    let [p1] = useState(1); //p1 is ai
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
    useEffect(() => {
        bestMove();
    }, []);

    function resetBoard() {
        window.location.reload()
    }
    function leaveRoom() {
        reactNavigator('/');
    }

    function p(y, x) {
        return (y < 0 || x < 0 || y >= h || x >= w) ? 0 : board[y][x];
    }

    function nextSpace(x) { //finds the next space (from the bottom)
        // console.log("col:", x);
        for (let y = h - 1; y >= 0; y--) {
            if (board[y][x] === 0) {
                return y;
            }
        }
        return -1;
    }
    function checkWinner() { //loops through rows, columns, diagonals
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                if (p(y, x) !== 0 && p(y, x) === p(y, x + 1) && p(y, x) === p(y, x + 2) && p(y, x) === p(y, x + 3)) {
                    return p(y, x);
                }
                if (p(y, x) !== 0 && p(y, x) === p(y + 1, x) && p(y, x) === p(y + 2, x) && p(y, x) === p(y + 3, x)) {
                    return p(y, x);
                }
                for (var d = -1; d <= 1; d += 2) {
                    if (p(y, x) !== 0 && p(y, x) === p(y + 1 * d, x + 1) && p(y, x) === p(y + 2 * d, x + 2) && p(y, x) === p(y + 3 * d, x + 3)) {
                        return p(y, x);
                    }
                }
            }
        }
        for (let y = 0; y < h; y++)
            for (let x = 0; x < w; x++)
                if (p(y, x) === 0) return 0; //no winner yet and not tie
        return -1; //tie
    }
    function handleClick(i, j) {
        if (checkWinner() === 0 && currentPlayer === p2) {
            i = nextSpace(j);
            if (i < 0) return null;
            const newBoard = board;
            newBoard[i][j] = currentPlayer;
            setBoard(newBoard);
            setCurrentPlayer(p1);
            bestMove();
        }
    };
    //___BEST MOVE  MINI MAX ALGO___________________________________________________________________________________________
    let scores = {
        1: Infinity,
        2: -Infinity,
    };
    function bestMove() {
        // AI to make its turn
        let bestScore = -Infinity;
        let move;
        let tempI;

        for (let j = 0; j < w; j++) {
            // Is the spot available?
            tempI = nextSpace(j);
            if (tempI >= 0) {
                if (move == null) {
                    move = j;
                  }
                board[tempI][j] = 1;
                let score = minimax(board, depth, false, 1, -Infinity, Infinity);
                board[tempI][j] = 0;
                if (score > bestScore) {
                    bestScore = score;
                    move = j;
                }
            }
        }
        const newBoard = [...board];
        newBoard[nextSpace(move)][move] = p1;
        setBoard(newBoard);
        setCurrentPlayer(p2);
    }

    function score_position(player, player2, nr_moves) {
        //heuristic could be more in depth, using 
        let score = 0
        for (let i = 1; i < h; i++) {
            for (let j = 1; j < w; j++) {
                if ((countPieces(i, j, i + 4, j, player) === 3 && countPieces(i, j, i + 4, j, 0) === 1) || (countPieces(i, j, i, j + 4, player) === 3 && countPieces(i, j, i, j + 4, 0) === 1) ||
                    (countDiagonal(i, j, 0, player) === 3 && countDiagonal(i, j, 1, 0) === 1)) {
                    score += 1000;
                }

                if ((countPieces(i, j, i + 4, j, player) === 2 && countPieces(i, j, i + 4, j, 0) === 2) || (countPieces(i, j, i, j + 4, player) === 2 && countPieces(i, j, i, j + 4, 0) === 2) ||
                    (countDiagonal(i, j, 0, player) === 2 && countDiagonal(i, j, 1, 0) === 2)) {
                    score += 10;
                }

                if ((countPieces(i, j, i + 4, j, player) === 1 && countPieces(i, j, i + 4, j, 0) === 3) || (countPieces(i, j, i, j + 4, player) === 1 && countPieces(i, j, i, j + 4, 0) === 3) ||
                    (countDiagonal(i, j, 0, player) === 1 && countDiagonal(i, j, 1, 0) === 3)) {
                    score += 1;
                }

                if ((countPieces(i, j, i + 4, j, player2) === 3 && countPieces(i, j, i + 4, j, 0) === 1) || (countPieces(i, j, i, j + 4, player2) === 3 && countPieces(i, j, i, j + 4, 0) === 1) ||
                    (countDiagonal(i, j, 0, player2) === 3 && countDiagonal(i, j, 1, 0) === 1)) {
                    score -= 1000;
                }

                if ((countPieces(i, j, i + 4, j, player2) === 2 && countPieces(i, j, i + 4, j, 0) === 2) || (countPieces(i, j, i, j + 4, player2) === 2 && countPieces(i, j, i, j + 4, 0) === 2) ||
                    (countDiagonal(i, j, 0, player2) === 2 && countDiagonal(i, j, 1, 0) === 2)) {
                    score -= 10;
                }

                if ((countPieces(i, j, i + 4, j, player2) === 1 && countPieces(i, j, i + 4, j, 0) === 3) || (countPieces(i, j, i, j + 4, player2) === 1 && countPieces(i, j, i, j + 4, 0) === 3) ||
                    (countDiagonal(i, j, 0, player2) === 1 && countDiagonal(i, j, 1, 0) === 3)) {
                    score -= 1;
                }
            }
        }
        return score
    }

    function countPieces(i, j, i2, j2, player) {
        let pieces = 0;
        for (i; i < i2; i++) {
            for (j; j < j2; j++) {
                if (board[i][j] === player) {
                    pieces += 1;
                }
            }
        }
        return pieces;
    }

    function countDiagonal(i, j, direction, player) {
        let pieces = 0;
        for (let x = 0; x < 4; x++) {
            if (direction === 1) {
                if (i + x < h && j + x < w) {
                    if (board[i + x][j + x] === player) {
                        pieces += 1;
                    }
                }
            } else {
                if (i + x < h && j - x < w && j - x > 0) {
                    if (board[i + x][j - x] === player) {
                        pieces += 1;
                    }
                }
            }
        }
        return pieces;
    }

    function minimax(board, depth, isMaximizing, nr_moves, alpha, beta) {
        let result = checkWinner();
        if (result > 0) {
            return scores[result] - 20 * nr_moves;
        }
        if (result === -1) {
            return 0 - 50 * nr_moves;
        }
        if (depth === 0) {
            return score_position(1, 2, nr_moves);
        }
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let j = 0; j < w; j++) {
                let tempI = nextSpace(j);
                if (tempI < h && tempI > -1) {
                    board[tempI][j] = 1;
                    let score = minimax(board, depth - 1, false, nr_moves + 1, alpha, beta);
                    board[tempI][j] = 0;
                    bestScore = Math.max(score, bestScore);
                    //pruning---------------------------------------------
                    alpha = Math.max(bestScore, alpha);
                    if (alpha >= beta) {
                      break
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let j = 0; j < w; j++) {
                // Is the spot available?
                let tempI = nextSpace(j);
                if (tempI < h && tempI > -1) {
                    board[tempI][j] = 2;
                    let score = minimax(board, depth - 1, true, nr_moves + 1, alpha, beta);
                    board[tempI][j] = 0;
                    bestScore = Math.min(score, bestScore);
                    //pruning-----------------------------------------
                    beta = Math.min(bestScore, beta);
                    if (alpha >= beta) {
                         break
                    }
                }
            }
            return bestScore;
        }
    }

    //______________________________________________________________________________________________
    const winner = checkWinner();
    let status;
    if (winner === -1) {
        status = "Draw!";
    } else if (winner) {
        if (winner === p1) status = "You Lose :(";
        else status = "You Win!";
    }
    const renderStatus = () => {
        if (status)
            return (<div className={styles.status}>{status}</div>
            );
    }
    const renderCircle = (i, j) => {
        if (board[i][j] === p1) {
            return (
                <div className={styles.square} onClick={() => handleClick(i, j)}>
                    <span className={styles.circle_p1}></span>
                </div>
            );
        }
        else if (board[i][j] === p2) {
            return (
                <div className={styles.square} onClick={() => handleClick(i, j)}>
                    <span className={styles.circle_p2}></span>
                </div>
            );
        }
        else return <div className={styles.square} onClick={() => handleClick(i, j)}></div>
    };

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

            <>
        <button className="diff_btn" onClick={toggleMenu}>AI Difficulty {depth}</button>
        <CSSTransition
          in={isOpen}
          classNames="menu"
          timeout={200}
          unmountOnExit
        >
          <div className="menu-container">
            <div className="container">
              <form>
                <label>
                  <input
                    type="radio"
                    name="radio"
                    value="4"
                    checked={depth === 4}
                    onChange={handleDifficultyChange}
                  />
                  <span>Easy</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="radio"
                    value="5"
                    checked={depth === 5}
                    onChange={handleDifficultyChange}
                  />
                  <span>Medium</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="radio"
                    value="6"
                    checked={depth === 6}
                    onChange={handleDifficultyChange}
                  />
                  <span>Hard</span>
                </label>
              </form>
            </div>
          </div>
        </CSSTransition>
        {isOpen && <div className="overlay" onClick={toggleMenu} />}
      </>
        </div>
    );
};

export default Connect4_ai_pruning;

