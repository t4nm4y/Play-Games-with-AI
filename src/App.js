import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TicTacToe_ai from './components/TicTacToe_ai';
import TicTacToe from './components/TicTacToe';
import HomePage from './components/HomePage'
import Connect4 from './components/Connect_4'
import Connect4_ai from './components/Connect_4_ai'
import Connect4_ai_pruning from './components/Connect_4_ai_pruning';
import Othello from './components/Othello';
import Othello_ai from './components/Othello_ai';
// import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/ttt' element={<TicTacToe />}></Route>
          <Route path='/ttt_ai' element={<TicTacToe_ai/>}></Route>
          <Route path='/cn4' element={<Connect4/>}></Route>
          <Route path='/cn4_ai' element={<Connect4_ai/>}></Route>
          <Route path='/cn4_ai_pruning' element={<Connect4_ai_pruning/>}></Route>
          <Route path='/othello' element={<Othello/>}></Route>
          <Route path='/othello_ai' element={<Othello_ai/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
