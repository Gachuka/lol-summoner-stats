import './SummonerStatComponent.scss'
import {
  getSummonerByName,
  getMatchHistoryByPUUID,
  getMatchByMatchId,
  // getQueueIds
} from '../../utilities/utilities.js'

import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import SearchBarComponent from '../SearchBarComponent/SearchBarComponent'
import MatchCard from '../MatchCard/MatchCard'

function SummonerStatComponent() {

  const versionNumber = "12.22.1"

  const { summonerName } = useParams()
  const [ summonerData, setSummonerData ] = useState()
  // const [ matchHistoryData, setMatchHistoryData ] = useState([])
  const [ matchHistoryList, setMatchHistoryList ] = useState([])
  // const [ queueIds, setQueueIds ] = useState()

  useEffect(() => {
    getSummonerByName(summonerName).then((res) => {
      // console.log(res.data)
      setSummonerData(res.data)
      return getMatchHistoryByPUUID(res.data.puuid)
    }).then((resMatchHistoryByPUUID) => {
      // setMatchHistoryData(resMatchHistoryByPUUID.data)
      // console.log(resMatchHistoryByPUUID.data)

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
          // console.log(resMatchHistoryByPUUID.data[i])
          // console.log("axios did something")
          matchHistoryDataArray.push(res.data.info)
        }).catch((error) => {console.log(error.message)}))
      }
      Promise.all(promises).then(() => {
        console.log("done")
        // console.log(matchHistoryDataArray)

        // Sort the matches by most recent to least recent
        const sortedMatchHistoryData = [...matchHistoryDataArray].sort((a, b) => {
          return b.gameCreation - a.gameCreation
        })
        setMatchHistoryList(sortedMatchHistoryData)
      });
      
      // setMatchHistoryData(resMatchHistoryByPUUID.data)
      // return getMatchByMatchId(resMatchHistoryByPUUID.data[0])
    // }).then((resMatchHistory) => {
      // console.log(resMatchHistory.data)
      // setMatchData(resMatchHistory.data)

    }).catch((error) => {
      console.log(error.message)
    })
  },[summonerName])

  const handleRefresh = () => {
    window.location.reload()
  }

  if (!summonerData) {
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
          {matchHistoryList.map((match) => {
            return (
              <MatchCard 
                key={match.gameId}
                matchData={match}
                summonerName={summonerName}
                versionNumber={versionNumber}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SummonerStatComponent