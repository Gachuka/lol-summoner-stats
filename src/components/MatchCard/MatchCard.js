import "./MatchCard.scss"

import ParticipantsComponent from "../ParticipantsComponent/ParticipantsComponent"

import { useEffect, useState } from "react"
import {
  getSummonerByName,
  getMatchHistoryByPUUID,
  getMatchByMatchId,
  getQueueIds
} from '../../utilities/utilities.js'
import MatchCardLoading from "../MatchCardLoading/MatchCardLoading"

function MatchCard({ matchData, summonerName, versionNumber }) {
  console.log(matchData.info)
  
  const [ participant, setParticipant ] = useState()
  const [ participantsTeam1, setParticipantsTeam1 ] = useState([])
  const [ participantsTeam2, setParticipantsTeam2 ] = useState([])
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
    const team1 = []
    const team2 = []
    for (let i = 0; i < matchData.info.participants.length; i++ ) {
      if (i < 5) {
        team1.push(matchData.info.participants[i])
      } else {
        team2.push(matchData.info.participants[i])
      }
    }
    setParticipantsTeam1(team1)
    // console.log(team1)
    setParticipantsTeam2(team2)
    // console.log(team2)
    
    // let participantTeamId

    for (let i = 0; i < matchData.info.participants.length; i++) {
      if (matchData.info.participants[i].summonerName === summonerName) {
        // console.log(matchData.info.participants[i])
        setParticipant(matchData.info.participants[i])
        setWin(matchData.info.participants[i].win)
        // participantTeamId = matchData.info.participants[i].teamId
      }
    }

    getQueueIds().then((res) => {
      const queueIds = res.data
      let queueTypeFound
      for (let i = 0; i < res.data.length; i++) {
        if(queueIds[i]["queueId"] === matchData.info.queueId) {
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
  },[])

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
    participantsTeam1.length === 0 || 
    participantsTeam2.length === 0 || 
    !participant ||
    !versionNumber ||
    !queueType
    ) {
    return (
      <MatchCardLoading />
    )
  }

  return (
    <div className='matchCard'>
      <div className='matchCard__card card'>
        <div className='card__container'>
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
  )
}

export default MatchCard;