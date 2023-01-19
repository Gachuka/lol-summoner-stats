import './SummonerStatComponent.scss'
import {
  getSummonerByName,
  getMatchHistoryByPUUID,
  getMatchByMatchId,
} from '../../utilities/utilities.js'

import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import SearchBarComponent from '../SearchBarComponent/SearchBarComponent'
import MatchCard from '../MatchCard/MatchCard'

function SummonerStatComponent() {

  const versionNumber = "13.1.1"

  const { summonerName } = useParams()
  const [ summonerData, setSummonerData ] = useState()
  const [ matchHistoryList, setMatchHistoryList ] = useState([])

  useEffect(() => {
    getSummonerByName(summonerName).then((res) => {
      console.log(res.data)
      setSummonerData(res.data)
      return getMatchHistoryByPUUID(res.data.puuid)
    }).then((resMatchHistoryByPUUID) => {

      const promises = []
      const matchHistoryDataArray = []
      for (let i = 0; i < 10; i++) {
        promises.push(getMatchByMatchId(resMatchHistoryByPUUID.data[i]).then((res) => {
          matchHistoryDataArray.push(res.data.info)
        }).catch((error) => {console.log(error.message)}))
      }
      Promise.all(promises).then(() => {
        console.log("done")

        // Sort the matches by most recent to least recent
        const sortedMatchHistoryData = [...matchHistoryDataArray].sort((a, b) => {
          return b.gameCreation - a.gameCreation
        })
        setMatchHistoryList(sortedMatchHistoryData)
      });

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