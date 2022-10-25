import './ParticipantsComponent.scss'

function ParticipantsComponent({versionNumber, summonerName, championName}) {

  return (
    <div className='team__summoner summoner'>
      <img className='champion-icon' src={`http://ddragon.leagueoflegends.com/cdn/${versionNumber}/img/champion/${championName}.png`}></img>
      <span className='summoner__name'>{summonerName}</span>
    </div>
  )
}

export default ParticipantsComponent;