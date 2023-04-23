
import { useState, useEffect } from 'react';
// import styles from '../css/TicTacToe.module.css';
import { useNavigate } from 'react-router-dom';

const Tem_page = () => {
    const [a_val, setBoard] = useState(-1);
    const [b_val, setBoard2] = useState(-2);
    console.log("gg")
    function fun(){
        setBoard(3000);
        setBoard2(10);
    }
    function handle_click() {
        let hello=b_val;
        setBoard2(20);
        fun();
        console.log('hello',hello)
    }
    // function handle_click2() {
    //     setBoard(3000)
    // }
    return (
        <div>
            <button onClick={handle_click}> btn</button>
            {/* <button onClick={handle_click2}> btn2</button> */}
        </div>
    );
};

export default Tem_page;


