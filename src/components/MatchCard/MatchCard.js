import "./MatchCard.scss"

import MatchCardLoading from "../MatchCardLoading/MatchCardLoading"
import ParticipantsComponent from "../ParticipantsComponent/ParticipantsComponent"

import { useEffect, useState } from "react"

const queueIdData = require('../../data/queue-id-data.json')

function MatchCard({ matchData, summonerName, versionNumber }) {
  
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

    if (!matchData) return
    const team1 = []
    const team2 = []

    for (let i = 0; i < matchData.participants.length; i++ ) {
      if (i < 5) {
        team1.push(matchData.participants[i])
      } else {
        team2.push(matchData.participants[i])
      }
    }
    setParticipantsTeam1(team1)
    setParticipantsTeam2(team2)

    for (let i = 0; i < matchData.participants.length; i++) {
      if (matchData.participants[i].summonerName.toLowerCase() === summonerName.toLowerCase()) {
        console.log("found name", matchData.participants[i].summonerName)
        setParticipant(matchData.participants[i])
        setWin(matchData.participants[i].win)
        break
      }
    }

    // getQueueIds().then((res) => {
    //   const queueIds = res.data
    //   let queueTypeFound
    //   for (let i = 0; i < res.data.length; i++) {
    //     if(queueIds[i]["queueId"] === matchData.queueId) {
    //       queueTypeFound = queueIds[i]["description"]
    //     }
    //   }

    //   if (queueTypeFound.includes("Ranked")) setQueueType("Ranked")
    //   else if (queueTypeFound.includes("Blind")) setQueueType("Normal Blind")
    //   else if (queueTypeFound.includes("Custom")) setQueueType("Custom")
    //   else if (queueTypeFound.includes("Co-op vs AI")) setQueueType("Co-op vs AI")
    //   else if (queueTypeFound.includes("Draft")) setQueueType("Normal Draft")
    //   else if (queueTypeFound.includes("ARAM")) setQueueType("ARAM")
    //   else if (queueTypeFound.includes("One for All")) setQueueType("One for All")
    //   else if (queueTypeFound.includes("Clash")) setQueueType("Clash")
    //   else if (queueTypeFound.includes("Ultra Rapid Fire")) setQueueType("URF")
    //   else setQueueType("Other")
    // })
    
    let queueTypeFound
    for (let i = 0; i < queueIdData.length; i++) {
      if(queueIdData[i]["queueId"] === matchData.queueId) {
        queueTypeFound = queueIdData[i]["description"]
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
  
  },[matchData, summonerName])

  const convertTime = (seconds) => {
    const mins = Math.floor(seconds/60)
    let secs = 0
    if (seconds%60 < 10 ? secs = "0" + seconds%60 : secs = seconds%60)
    return `${mins}:${secs}`
  }

  const timeFromNow = (gameEndTimestamp) => {
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
    !summonerName ||
    matchData === undefined ||
    participantsTeam1.length === 0 || 
    participantsTeam2.length === 0 || 
    !participant ||
    !versionNumber ||
    !queueType
    ) {

    if (!summonerName) console.log("missing summoner name")
    if (matchData === undefined) console.log("missing match data")
    if (participantsTeam1.length === 0) console.log("missing participant team 1")
    if (participantsTeam2.length === 0) console.log("missing participant team 2")
    if (!participant) console.log("missing participant")
    if (!versionNumber) console.log("missing version number")
    if (!queueType) console.log("missing queue type")

    return (
      <MatchCardLoading />
    )
  }

  return (
    <div className='matchCard card'>
      <div className='card__container'>
        <div className='game'>
          <div className='game__mode'>{queueType}</div>
          <div className='game__from-now'>{timeFromNow(matchData.gameEndTimestamp)}</div>
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
  )
}

export default MatchCard;