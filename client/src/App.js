import './App.css';
import LoginRegister from './views/LoginRegister';
import Game from './views/Game';
import Schedule from './views/Schedule';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (

    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<Schedule />} path={"/games"} />
          <Route element={<Schedule />} path={"/home"} />
          <Route element={<Schedule />} path={"/"} />
          <Route element={<LoginRegister />} path={"/login"} />
          <Route element={<Game />} path={"/games/:gameId"} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
