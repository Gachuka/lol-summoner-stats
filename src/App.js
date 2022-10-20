import './App.scss';

import {BrowserRouter, Routes, Route} from 'react-router-dom'

import SummonerStatComponent from './components/SummonerStatComponent/SummonerStatComponent';

function App() {
  return (
    <div className="App">
      <SummonerStatComponent />
    </div>
  );
}

export default App;
