import './ParticipantsComponent.scss'

import { Link } from 'react-router-dom'

function ParticipantsComponent({versionNumber, summonerName, championName}) {

  return (
    <Link to={`/summoner/${summonerName}`} className='team__summoner summoner'>
      <img className='champion-icon' src={`http://ddragon.leagueoflegends.com/cdn/${versionNumber}/img/champion/${championName}.png`} alt={championName}></img>
      <span className='summoner__name'>{summonerName}</span>
    </Link>
  )
}

export default ParticipantsComponent;