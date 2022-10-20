import './SummonerStatComponent.scss'
import {getSummonerByName,getMatchHistoryByPUUID,getMatchByMatchId} from '../../utilities/utilities.js'

import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

function SummonerStatComponent() {

  const {summonerName} = useParams()
  const [ summonerData, setSummonerData ] = useState()
  const [ matchHistoryData, setMatchHistoryData ] = useState()

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
      })
    }
  },[summonerData])
  
  useEffect(() => {
    if(matchHistoryData) {
      getMatchByMatchId(matchHistoryData[0]).then((res) => {
        console.log(res.data.metadata.participants)
        const matchParticipants = res.data.metadata.participants
        console.log(matchParticipants)
      })
    }
  },[matchHistoryData])

  if (!summonerData) {
    return (
      <h1>Loading</h1>
    )
  }

  return (
    <div className='ssc'>
      <div className='ssc__container'>
        <h1>{summonerData['name']}</h1>
        <button>Refresh</button>
        <div></div>
      </div>
    </div>
  )
}

export default SummonerStatComponent