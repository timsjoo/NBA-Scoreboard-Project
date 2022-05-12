import './App.css';
import LoginRegister from './views/LoginRegister';
import Game from './views/Game';
import Schedule from './components/Schedule';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (

    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<LoginRegister />} path={"/login"} />
          <Route element={<LoginRegister />} path={"/"} />
          <Route element={<Schedule />} path={"/test"} />
          <Route element={<Game />} path={"/game"} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
