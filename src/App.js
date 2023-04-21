import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TicTacToe_ai from './components/TicTacToe_ai';
import TicTacToe from './components/TicTacToe';
import HomePage from './components/HomePage'
import Connect_4 from './components/Connect_4'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/ttt' element={<TicTacToe />}></Route>
          <Route path='/ttt_ai' element={<TicTacToe_ai/>}></Route>
          <Route path='/cn4' element={<Connect_4/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
