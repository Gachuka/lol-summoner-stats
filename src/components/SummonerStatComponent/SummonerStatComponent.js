import './SummonerStatComponent.scss'
import {
  getSummonerByName,
  getMatchHistoryByPUUID,
  getMatchByMatchId,
  getQueueIds
} from '../../utilities/utilities.js'

import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import ParticipantsComponent from '../ParticipantsComponent/ParticipantsComponent'
import SearchBarComponent from '../SearchBarComponent/SearchBarComponent'

function SummonerStatComponent() {

  const versionNumber = "12.20.1"

  const { summonerName } = useParams()
  const [ summonerData, setSummonerData ] = useState()
  // const [ matchHistoryData, setMatchHistoryData ] = useState()
  const [ matchData, setMatchData ] = useState()
  const [ matchHistoryData, setMatchHistoryData ] = useState()
  const [ participant, setParticipant ] = useState()
  const [ participantsTeam1, setParticipantsTeam1 ] = useState([])
  const [ participantsTeam2, setParticipantsTeam2 ] = useState([])
  // const [ queueIds, setQueueIds ] = useState()
  const [ queueType, setQueueType ] = useState()
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
      // console.log(res.data)
      setSummonerData(res.data)
      return getMatchHistoryByPUUID(res.data.puuid)
    }).then((resMatchHistoryByPUUID) => {
      console.log(resMatchHistoryByPUUID.data)

      // let MatchHistoryByPUUID = []

      // if(!localStorage.getItem("match_history_data")) {
      //   localStorage.setItem("match_history_data", JSON.stringify(resMatchHistoryByPUUID.data))
      //   setMatchHistoryData(resMatchHistoryByPUUID.data)
      //   MatchHistoryByPUUID = resMatchHistoryByPUUID.data
      // } else {
      //   setMatchHistoryData(JSON.parse(localStorage.getItem("match_history_data")))
      //   MatchHistoryByPUUID = JSON.parse(localStorage.getItem("match_history_data"))
      // }

      // console.log(MatchHistoryByPUUID)

      // for (let i = 0; i < MatchHistoryByPUUID.length; i++) {
      //   console.log(MatchHistoryByPUUID[i])
      // }

      const promises = []
      const matchHistoryDataArray = []
      for (let i = 0; i < 10; i++) {
        promises.push(getMatchByMatchId(resMatchHistoryByPUUID.data[i]).then((res) => {
          console.log(resMatchHistoryByPUUID.data[i])
          console.log("axios did something")
          matchHistoryDataArray.push(res.data.info)
        }).catch((error) => {console.log(error.message)}))
      }
      Promise.all(promises).then(() => {
        console.log("done")
        console.log(matchHistoryDataArray)
      });
      
      // setMatchHistoryData(resMatchHistoryByPUUID.data)
      return getMatchByMatchId(resMatchHistoryByPUUID.data[0])
    }).then((resMatchHistory) => {
      console.log(resMatchHistory.data)
      setMatchData(resMatchHistory.data)
      const team1 = []
      const team2 = []
      for (let i = 0; i < resMatchHistory.data.info.participants.length; i++ ) {
        if (i < 5) {
          team1.push(resMatchHistory.data.info.participants[i])
        } else {
          team2.push(resMatchHistory.data.info.participants[i])
        }
      }
      setParticipantsTeam1(team1)
      // console.log(team1)
      setParticipantsTeam2(team2)
      // console.log(team2)
      
      let participantTeamId

      for (let i = 0; i < resMatchHistory.data.info.participants.length; i++) {
        if (resMatchHistory.data.info.participants[i].summonerName === summonerName) {
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

      getQueueIds().then((res) => {
        const queueIds = res.data
        let queueTypeFound
        for (let i = 0; i < res.data.length; i++) {
          if(queueIds[i]["queueId"] === resMatchHistory.data.info.queueId) {
            queueTypeFound = queueIds[i]["description"]
          }
        }
  
        if (queueTypeFound.includes("Ranked")) setQueueType("Ranked")
        else if (queueTypeFound.includes("Blind")) setQueueType("Normal Blind")
        else if (queueTypeFound.includes("Custom")) setQueueType("Custom")
        else if (queueTypeFound.includes("Co-op vs AI")) setQueueType("Co-op vs AI")
        else if (queueTypeFound.includes("Draft")) setQueueType("Normal Draft")
        else if (queueTypeFound.includes("ARAM")) setQueueType("ARAM")
        else if (queueTypeFound.includes("One for All")) setQueueType("One for All")
        else if (queueTypeFound.includes("Clash")) setQueueType("Clash")
        else if (queueTypeFound.includes("Ultra Rapid Fire")) setQueueType("URF")
        else setQueueType("Other")
      })
    }).catch((error) => {
      console.log(error.message)
    })
  },[summonerName])

  const handleRefresh = () => {
    window.location.reload()
  }

  const convertTime = (seconds) => {
    // console.log(seconds)
    const mins = Math.floor(seconds/60)
    let secs = 0
    // console.log(('0' + seconds%60))
    if (seconds%60 < 10 ? secs = "0" + seconds%60 : secs = seconds%60)
    return `${mins}:${secs}`
  }

  const timeFromNow = (gameEndTimestamp) => {
    // const currentTime = new Date()
    let outputTime
    const currentTime = Date.now()
    const nearestMinute = Math.ceil(((currentTime-gameEndTimestamp)/1000)/60)
    if (nearestMinute < 60) {
      outputTime = `${nearestMinute} ${nearestMinute === 1 ? 'minute' : 'minutes'} ago`
    } else if (nearestMinute >= 60 && nearestMinute < 1440) {
      const nearestHour = Math.ceil(((currentTime-gameEndTimestamp)/1000)/3600)
      outputTime = `${nearestHour} ${nearestHour === 1 ? 'hour' : 'hours'} ago`
    } else {
      const nearestDay = Math.ceil(((currentTime-gameEndTimestamp)/1000)/86400)
      outputTime = `${nearestDay} ${nearestDay === 1 ? 'day' : 'days'} ago`
    }
    return outputTime
  }

  if (
    !summonerData || 
    participantsTeam1.length === 0 || 
    participantsTeam2.length === 0 || 
    !participant
    ) {
    return (
      <h1>Loading</h1>
    )
  }

  return (
    <div className='ssc'>
      <div className='ssc__container'>
        <div className='ssc__search'>
          <SearchBarComponent />
        </div>
        <h1>{summonerData['name']}</h1>
        <button onClick={handleRefresh}>Update</button>

        <div className='match-history'>
          <div className='match-history__card'>
            <div className='game'>
              {/* <div className='game__mode'>{matchData.info.gameMode}</div> */}
              <div className='game__mode'>{queueType}</div>
              {/* <div className='game__mode'>{matchType()}</div> */}
              <div className='game__from-now'>{timeFromNow(matchData.info.gameEndTimestamp)}</div>
              <div className='game__result-time result-time'>
                <div className={`result-time__result ${win ? "win" : "lose"}`}>{win ? "Win" : "Loss"}</div>
                <div className='result-time__time'>{convertTime(participant.timePlayed)}</div>                  
              </div>
            </div>

            <div className='played'>
              <div className='played__champion champion'>
                <img className='champion__img' src={`http://ddragon.leagueoflegends.com/cdn/${versionNumber}/img/champion/${participant.championName}.png`} alt={participant.championName}></img>
                <div className='champion__level'>{participant.champLevel}</div>
              </div>
              <div className='summoner-skill'>
                <img className='summoner-skill__img' src={`http://ddragon.leagueoflegends.com/cdn/${versionNumber}/img/spell/${summonerSpells[participant.summoner1Id]}.png`} alt={`${(summonerSpells[participant.summoner1Id]).slice(8)}`}></img>
                <img className='summoner-skill__img' src={`http://ddragon.leagueoflegends.com/cdn/${versionNumber}/img/spell/${summonerSpells[participant.summoner2Id]}.png`} alt={`${(summonerSpells[participant.summoner2Id]).slice(8)}`}></img>
              </div>
            </div>
            
            <div className='stats'></div>

            <div className='items'>
              <div className='items__row'>
                <div className={`items${participant.item0 === 0 ? "__blank" : "__item"} item`}>
                  {participant.item0 !== 0 ? <img className='item__img' src={`http://ddragon.leagueoflegends.com/cdn/${versionNumber}/img/item/${participant.item0}.png`} alt={`item number ${participant.item0}`}/> : ""}
                </div>
                <div className={`items${participant.item1 === 0 ? "__blank" : "__item"} item`}>
                  {participant.item1 !== 0 ? <img className='item__img' src={`http://ddragon.leagueoflegends.com/cdn/${versionNumber}/img/item/${participant.item1}.png`} alt={`item number ${participant.item1}`}/> : ""}
                </div>
                <div className={`items${participant.item2 === 0 ? "__blank" : "__item"} item`}>
                  {participant.item2 !== 0 ? <img className='item__img' src={`http://ddragon.leagueoflegends.com/cdn/${versionNumber}/img/item/${participant.item2}.png`} alt={`item number ${participant.item2}`}/> : ""}
                </div>
                <div className={`items${participant.item6 === 0 ? "__blank" : "__item"} item`}>
                  {participant.item6 !== 0 ? <img className='item__img' src={`http://ddragon.leagueoflegends.com/cdn/${versionNumber}/img/item/${participant.item6}.png`} alt={`item number ${participant.item6}`}/> : ""}
                </div>
              </div>
              <div className='items__row'>
                <div className={`items${participant.item3 === 0 ? "__blank" : "__item"} item`}>
                  {participant.item3 !== 0 ? <img className='item__img' src={`http://ddragon.leagueoflegends.com/cdn/${versionNumber}/img/item/${participant.item3}.png`} alt={`item number ${participant.item3}`}/> : ""}
                </div>
                <div className={`items${participant.item4 === 0 ? "__blank" : "__item"} item`}>
                  {participant.item4 !== 0 ? <img className='item__img' src={`http://ddragon.leagueoflegends.com/cdn/${versionNumber}/img/item/${participant.item4}.png`} alt={`item number ${participant.item4}`}/> : ""}
                </div>
                <div className={`items${participant.item5 === 0 ? "__blank" : "__item"} item`}>
                  {participant.item5 !== 0 ? <img className='item__img' src={`http://ddragon.leagueoflegends.com/cdn/${versionNumber}/img/item/${participant.item5}.png`} alt={`item number ${participant.item5}`}/> : ""}
                </div>
                <div className='items__filler'>
                </div>
              </div>
            </div>
            
            <div className='teams'>
              <div className='teams__team team'>
                {participantsTeam1.map((participant) => {
                  return (
                    <ParticipantsComponent 
                      key={participant.puuid}
                      versionNumber={versionNumber}
                      championName={participant.championName}
                      summonerName={participant.summonerName}
                    />
                  )
                })}
              </div>
              <div className='teams__team team'>
                {participantsTeam2.map((participant) => {
                  return (
                    <ParticipantsComponent 
                      key={participant.puuid}
                      versionNumber={versionNumber}
                      championName={participant.championName}
                      summonerName={participant.summonerName}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummonerStatComponent