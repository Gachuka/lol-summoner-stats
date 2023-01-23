import './App.scss';

import {BrowserRouter, Routes, Route} from 'react-router-dom'

import MainPage from './pages/MainPage/MainPage';
import SummonerStatComponent from './components/SummonerStatComponent/SummonerStatComponent';
import TopNavComponent from './components/TopNavComponent/TopNavComponent';

function App() {
  return (
    <div className="App">
      <TopNavComponent />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='summoner/:summonerName' element={<SummonerStatComponent/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
