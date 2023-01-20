import './ParticipantsComponent.scss'

import { Link } from 'react-router-dom'

function ParticipantsComponent({ championName, participantName, summonerName, versionNumber, win }) {
  return (
    <Link to={`/summoner/${participantName}`} className='team'>
      <div className={`${participantName === summonerName ? "team__champion--player" : "team__champion"} ${participantName === summonerName ? win ? "player-win" : "player-lose" : ""}`}>
        <img 
          className='team__champion-icon' 
          src={`http://ddragon.leagueoflegends.com/cdn/${versionNumber}/img/champion/${championName === "FiddleSticks" ? "Fiddlesticks": championName}.png`} 
          alt={championName} 
        />
      </div>
      <span className={`${participantName === summonerName ? "team__name--player" : "team__name"}`}>
        {participantName}
      </span>
    </Link>
  )
}

export default ParticipantsComponent;