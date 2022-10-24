import './SummonerStatComponent.scss'
import {getSummonerByName,getSummonerByPUUID,getMatchHistoryByPUUID,getMatchByMatchId} from '../../utilities/utilities.js'

import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

function SummonerStatComponent() {

  const { summonerName } = useParams()
  const [ summonerData, setSummonerData ] = useState()
  const [ matchHistoryData, setMatchHistoryData ] = useState()
  const [ matchData, setMatchData ] = useState()
  const [ participant, setParticipant ] = useState()
  const [ participants, setParticipants ] = useState([])
  const [ win, setWin ] = useState()

  const summonerSpells = {
    21:"SummonerBarrier",
    1:"SummonerBoost",
    14:"SummonerDot",
    3:"SummonerExhaust",
    4:"SummonerFlash",
    6:"SummonerHaste",
    7:"SummonerHeal",
    13:"SummonerMana",
    30:"SummonerPoroRecall",
    31:"SummonerPoroThrow",
    11:"SummonerSmite",
    39:"SummonerSnowURFSnowball_Mark",
    32:"SummonerSnowball",
    12:"SummonerTeleport",
    54:"Summoner_UltBookPlaceholder",
    55:"Summoner_UltBookSmitePlaceholder"
  }

  useEffect(() => {
    getSummonerByName(summonerName).then((res) => {
      console.log(res.data)
      setSummonerData(res.data)
      return getMatchHistoryByPUUID(res.data.puuid)
    }).then((resMatchHistoryByPUUID) => {
      console.log(resMatchHistoryByPUUID.data)
      setMatchHistoryData(resMatchHistoryByPUUID.data)
      return getMatchByMatchId(resMatchHistoryByPUUID.data[0])
    }).then((resMatchHistory) => {
      console.log(resMatchHistory.data)
      setMatchData(resMatchHistory.data)
      setParticipants(resMatchHistory.data.info.participants)

      let participantTeamId

      for (let i = 0; i < resMatchHistory.data.info.participants.length; i++) {
        if (resMatchHistory.data.info.participants[i].summonerName === "Gachuka") {
          console.log(resMatchHistory.data.info.participants[i])
          setParticipant(resMatchHistory.data.info.participants[i])
          participantTeamId = resMatchHistory.data.info.participants[i].teamId
        }
      }

      const teamsDataArray = resMatchHistory.data.info.teams

      for (let i = 0; i < teamsDataArray.length; i++) {
        if (teamsDataArray[i].teamId === participantTeamId) {
          // console.log(teamsDataArray[i].win)
          setWin(teamsDataArray[i].win)
        }
      }

    }).catch((error) => {
      console.log(error.message)
    })
  },[])

  const handleRefresh = () => {
    window.location.reload()
  }

  const findParticipant = () => {
    // teamID
    // summonerName
    for (let i = 0; i < participants.length; i++) {
      if (participants.summoner === "Gachuka") {
        console.log(i)
      }
    }
  }

  if (!summonerData || participants.length === 0 || !participant) {
    return (
      <h1>Loading</h1>
    )
  }

  return (
    <div className='ssc'>
      <div className='ssc__container'>
        <h1>{summonerData['name']}</h1>
        <div className={`win-lose ${win ? "win" : "lose"}`}>{win ? "Win" : "Lose"}</div>
        <button onClick={handleRefresh}>Update</button>

        <div className='played'>
          <div className='played__champion champion'>
            <img className='champion__img' src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/${participant.championName}.png`}></img>
            <div className='champion__level'>{participant.champLevel}</div>
          </div>
          <div className='summoner-skill'>
            <img className='summoner-skill__img' src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/spell/${summonerSpells[participant.summoner1Id]}.png`}></img>
            <img className='summoner-skill__img' src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/spell/${summonerSpells[participant.summoner2Id]}.png`}></img>
          </div>
          <div className='stats'></div>

          <div className='items'>
            <div className='items__row'>
              <div className='items1'>
                <img className='item item__img' src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/item/${participant.item0}.png`}/>
              </div>
              <div className='items2'>
                <img className='item item__img' src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/item/${participant.item1}.png`}/>
              </div>
              <div className='items3'>
                <img className='item item__img' src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/item/${participant.item2}.png`}/>
              </div>
              <div className='items7'>
                <img className='item item__img' src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/item/${participant.item6}.png`}/>
              </div>
            </div>
            <div className='items__row'>
              <div className='items4'>
                <img className='item item__img' src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/item/${participant.item3}.png`}/>
              </div>
              <div className='items5'>
                <img className='item item__img' src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/item/${participant.item4}.png`}/>
              </div>
              <div className='items6'>
                <img className='item item__img' src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/item/${participant.item5}.png`}/>
              </div>
              <div className='filler'>
                <img className='item item__filler' src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/item/${participant.item6}.png`}/>
              </div>
            </div>
          </div>
          
          <div className='teams'>
            <div className='teams__team team'>
              <div className='team__summoner summoner'>
                <img className='champion-icon' src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/${participants[0].championName}.png`}></img>
                <span className='summoner__name'>{participants[0].summonerName}</span>
              </div>
              <div className='team__summoner summoner'>
                <img className='champion-icon' src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/${participants[1].championName}.png`}></img>
                <span className='summoner__name'>{participants[1].summonerName}</span>
              </div>
              <div className='team__summoner summoner'>
                <img className='champion-icon' src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/${participants[2].championName}.png`}></img>
                <span className='summoner__name'>{participants[2].summonerName}</span></div>
              <div className='team__summoner summoner'>
                <img className='champion-icon' src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/${participants[3].championName}.png`}></img>
                <span className='summoner__name'>{participants[3].summonerName}</span></div>
              <div className='team__summoner summoner'>
                <img className='champion-icon' src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/${participants[4].championName}.png`}></img>
                <span className='summoner__name'>{participants[4].summonerName}</span></div>
            </div>
            <div className='teams__team team'>
              <div className='team__summoner summoner'>
                <img className='champion-icon' src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/${participants[5].championName}.png`}></img>
                <span className='summoner__name'>{participants[5].summonerName}</span></div>
              <div className='team__summoner summoner'>
                <img className='champion-icon' src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/${participants[6].championName}.png`}></img>
                <span className='summoner__name'>{participants[6].summonerName}</span></div>
              <div className='team__summoner summoner'>
                <img className='champion-icon' src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/${participants[7].championName}.png`}></img>
                <span className='summoner__name'>{participants[7].summonerName}</span></div>
              <div className='team__summoner summoner'>
                <img className='champion-icon' src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/${participants[8].championName}.png`}></img>
                <span className='summoner__name'>{participants[8].summonerName}</span></div>
              <div className='team__summoner summoner'>
                <img className='champion-icon' src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/${participants[9].championName}.png`}></img>
                <span className='summoner__name'>{participants[9].summonerName}</span></div>
            </div>
          </div>
        </div>



      </div>
    </div>
  )
}

export default SummonerStatComponent