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

  // const queueType = [
  //   {
  //     "queueId": 0,
  //     "map": "Custom games",
  //     "description": null,
  //     "notes": null
  //   },
  //   {
  //     "queueId": 72,
  //     "map": "Howling Abyss",
  //     "description": "1v1 Snowdown Showdown games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 73,
  //     "map": "Howling Abyss",
  //     "description": "2v2 Snowdown Showdown games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 75,
  //     "map": "Summoner's Rift",
  //     "description": "6v6 Hexakill games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 76,
  //     "map": "Summoner's Rift",
  //     "description": "Ultra Rapid Fire games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 78,
  //     "map": "Howling Abyss",
  //     "description": "One For All: Mirror Mode games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 83,
  //     "map": "Summoner's Rift",
  //     "description": "Co-op vs AI Ultra Rapid Fire games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 100,
  //     "map": "Butcher's Bridge",
  //     "description": "5v5 ARAM games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 310,
  //     "map": "Summoner's Rift",
  //     "description": "Nemesis games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 313,
  //     "map": "Summoner's Rift",
  //     "description": "Black Market Brawlers games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 317,
  //     "map": "Crystal Scar",
  //     "description": "Definitely Not Dominion games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 325,
  //     "map": "Summoner's Rift",
  //     "description": "All Random games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 400,
  //     "map": "Summoner's Rift",
  //     "description": "5v5 Draft Pick games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 420,
  //     "map": "Summoner's Rift",
  //     "description": "5v5 Ranked Solo games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 430,
  //     "map": "Summoner's Rift",
  //     "description": "5v5 Blind Pick games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 440,
  //     "map": "Summoner's Rift",
  //     "description": "5v5 Ranked Flex games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 450,
  //     "map": "Howling Abyss",
  //     "description": "5v5 ARAM games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 460,
  //     "map": "Twisted Treeline",
  //     "description": "3v3 Blind Pick games",
  //     "notes": "Deprecated in patch 9.23"
  //   },
  //   {
  //     "queueId": 470,
  //     "map": "Twisted Treeline",
  //     "description": "3v3 Ranked Flex games",
  //     "notes": "Deprecated in patch 9.23"
  //   },
  //   {
  //     "queueId": 600,
  //     "map": "Summoner's Rift",
  //     "description": "Blood Hunt Assassin games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 610,
  //     "map": "Cosmic Ruins",
  //     "description": "Dark Star: Singularity games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 700,
  //     "map": "Summoner's Rift",
  //     "description": "Clash games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 820,
  //     "map": "Twisted Treeline",
  //     "description": "Co-op vs. AI Beginner Bot games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 830,
  //     "map": "Summoner's Rift",
  //     "description": "Co-op vs. AI Intro Bot games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 840,
  //     "map": "Summoner's Rift",
  //     "description": "Co-op vs. AI Beginner Bot games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 850,
  //     "map": "Summoner's Rift",
  //     "description": "Co-op vs. AI Intermediate Bot games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 900,
  //     "map": "Summoner's Rift",
  //     "description": "ARURF games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 910,
  //     "map": "Crystal Scar",
  //     "description": "Ascension games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 920,
  //     "map": "Howling Abyss",
  //     "description": "Legend of the Poro King games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 940,
  //     "map": "Summoner's Rift",
  //     "description": "Nexus Siege games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 950,
  //     "map": "Summoner's Rift",
  //     "description": "Doom Bots Voting games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 960,
  //     "map": "Summoner's Rift",
  //     "description": "Doom Bots Standard games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 980,
  //     "map": "Valoran City Park",
  //     "description": "Star Guardian Invasion: Normal games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 990,
  //     "map": "Valoran City Park",
  //     "description": "Star Guardian Invasion: Onslaught games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 1000,
  //     "map": "Overcharge",
  //     "description": "PROJECT: Hunters games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 1010,
  //     "map": "Summoner's Rift",
  //     "description": "Snow ARURF games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 1020,
  //     "map": "Summoner's Rift",
  //     "description": "One for All games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 1030,
  //     "map": "Crash Site",
  //     "description": "Odyssey Extraction: Intro games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 1040,
  //     "map": "Crash Site",
  //     "description": "Odyssey Extraction: Cadet games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 1050,
  //     "map": "Crash Site",
  //     "description": "Odyssey Extraction: Crewmember games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 1060,
  //     "map": "Crash Site",
  //     "description": "Odyssey Extraction: Captain games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 1070,
  //     "map": "Crash Site",
  //     "description": "Odyssey Extraction: Onslaught games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 1090,
  //     "map": "Convergence",
  //     "description": "Teamfight Tactics games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 1100,
  //     "map": "Convergence",
  //     "description": "Ranked Teamfight Tactics games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 1110,
  //     "map": "Convergence",
  //     "description": "Teamfight Tactics Tutorial games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 1111,
  //     "map": "Convergence",
  //     "description": "Teamfight Tactics test games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 1300,
  //     "map": "Nexus Blitz",
  //     "description": "Nexus Blitz games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 1400,
  //     "map": "Summoner's Rift",
  //     "description": "Ultimate Spellbook games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 1900,
  //     "map": "Summoner's Rift",
  //     "description": "Pick URF games",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 2000,
  //     "map": "Summoner's Rift",
  //     "description": "Tutorial 1",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 2010,
  //     "map": "Summoner's Rift",
  //     "description": "Tutorial 2",
  //     "notes": null
  //   },
  //   {
  //     "queueId": 2020,
  //     "map": "Summoner's Rift",
  //     "description": "Tutorial 3",
  //     "notes": null
  //   }
  // ]

  useEffect(() => {
    getSummonerByName(summonerName).then((res) => {
      // console.log(res.data)
      setSummonerData(res.data)
      return getMatchHistoryByPUUID(res.data.puuid)
    }).then((resMatchHistoryByPUUID) => {
      console.log(resMatchHistoryByPUUID.data)

      let MatchHistoryByPUUID = []

      if(!localStorage.getItem("match_history_data")) {
        localStorage.setItem("match_history_data", JSON.stringify(resMatchHistoryByPUUID.data))
        setMatchHistoryData(resMatchHistoryByPUUID.data)
        MatchHistoryByPUUID = resMatchHistoryByPUUID.data
      } else {
        setMatchHistoryData(JSON.parse(localStorage.getItem("match_history_data")))
        MatchHistoryByPUUID = JSON.parse(localStorage.getItem("match_history_data"))
      }

      console.log(MatchHistoryByPUUID)

      for (let i = 0; i < MatchHistoryByPUUID.length; i++) {
        console.log(MatchHistoryByPUUID[i])
      }

      const promises = []
      const matchHistoryDataArray = []
      for (let i = 0; i < 10; i++) {
        promises.push(getMatchByMatchId(resMatchHistoryByPUUID.data[i]).then((res) => {
          console.log(resMatchHistoryByPUUID.data[i])
          console.log("axios did something")
          matchHistoryDataArray.push(res.data)
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