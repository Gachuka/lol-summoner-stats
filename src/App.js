import './App.scss';

import {BrowserRouter, Routes, Route} from 'react-router-dom'

import SummonerStatComponent from './components/SummonerStatComponent/SummonerStatComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='summoner/:summonerName' element={<SummonerStatComponent/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
