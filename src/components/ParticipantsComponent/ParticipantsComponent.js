import './ParticipantsComponent.scss'

import { Link } from 'react-router-dom'

function ParticipantsComponent({ championName, participantName, summonerName, versionNumber, win }) {

  const isPlayer = participantName === summonerName

  return (
    <Link to={`/summoner/${participantName}`} className='team'>
      <div className={`${isPlayer ? "team__champion--player" : "team__champion"} ${isPlayer ? win ? "player-win" : "player-lose" : ""}`}>
        <img 
          className='team__champion-icon' 
          src={`http://ddragon.leagueoflegends.com/cdn/${versionNumber}/img/champion/${championName === "FiddleSticks" ? "Fiddlesticks": championName}.png`} 
          alt={championName} 
        />
      </div>
      <span className={`${isPlayer ? "team__name--player" : "team__name"}`}>
        {participantName}
      </span>
    </Link>
  )
}

export default ParticipantsComponent;