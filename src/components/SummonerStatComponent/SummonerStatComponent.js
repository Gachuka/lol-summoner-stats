import './SummonerStatComponent.scss'
import {getSummonerByName,getSummonerByPUUID,getMatchHistoryByPUUID,getMatchByMatchId} from '../../utilities/utilities.js'

import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

function SummonerStatComponent() {

  const {summonerName} = useParams()
  const [ summonerData, setSummonerData ] = useState()
  const [ matchHistoryData, setMatchHistoryData ] = useState()
  const [ matchData, setMatchData ] = useState()
  const [ participants, setParticipants ] = useState([])
  const [ win, setWin ] = useState()

  useEffect(() => {
    getSummonerByName(summonerName).then((res) => {
      setSummonerData(res.data)
    }).catch((error) => {
      console.log(error.message)
    })
  },[])

  useEffect(() => {
    if(summonerData) {
      getMatchHistoryByPUUID(summonerData['puuid']).then((res) => {
        setMatchHistoryData(res.data)
        // console.log(res.data)
      })
    }
  },[summonerData])
  
  // useEffect(() => {
  //   if(matchHistoryData) {
  //     getMatchByMatchId(matchHistoryData[0]).then((res) => {
  //       // console.log(res.data.metadata.participants)
  //       const matchParticipants = res.data.metadata.participants
  //       const matchSummonerNames = []
  //       for ( let i = 0; i < matchParticipants.length; i++) {
  //         getSummonerByPUUID(matchParticipants[i]).then((res) => {
  //           matchSummonerNames.push(res.data.name)
  //         })
  //       }
  //       console.log(matchSummonerNames)
  //     })
  //   }
  // },[matchHistoryData])
  useEffect(() => {
    if(matchHistoryData) {
      getMatchByMatchId(matchHistoryData[0]).then((res) => {
        console.log(res.data)
        setMatchData(res.data)
        setParticipants(res.data.info.participants)
        // for(let i = 0; i < participants.length; i ++) {
        //   console.log(participants[i].summonerName)
        //   console.log(participants[i].championId)
        // }
      })
    }
  },[matchHistoryData])

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

  if (participants && matchData && !win) {
    let participantTeamId
    for (let i = 0; i < participants.length; i++) {
      if (participants[i].summonerName === "Gachuka") {
        console.log(participants[i])
        console.log(participants[i].teamId)
        participantTeamId = participants[i].teamId
      }
    }
    const teamsDataArray = matchData.info.teams
    console.log(matchData.info.teams)
    for (let i = 0; i < teamsDataArray.length; i++) {
      if (teamsDataArray[i].teamId === participantTeamId) {
        console.log(teamsDataArray[i].win)
        setWin(teamsDataArray[i].win)
      }
    }
  }

  if (!summonerData || participants.length === 0 || !win) {
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
        <div className='team1'>
          <div className='team1-summoner1'>{participants[0].summonerName}</div>
          <div className='team1-summoner2'>{participants[1].summonerName}</div>
          <div className='team1-summoner3'>{participants[2].summonerName}</div>
          <div className='team1-summoner4'>{participants[3].summonerName}</div>
          <div className='team1-summoner5'>{participants[4].summonerName}</div>
        </div>
        <div className='team2'>
          <div className='team2-summoner1'>{participants[5].summonerName}</div>
          <div className='team2-summoner2'>{participants[6].summonerName}</div>
          <div className='team2-summoner3'>{participants[7].summonerName}</div>
          <div className='team2-summoner4'>{participants[8].summonerName}</div>
          <div className='team2-summoner5'>{participants[9].summonerName}</div>
        </div>
      </div>
    </div>
  )
}

export default SummonerStatComponent