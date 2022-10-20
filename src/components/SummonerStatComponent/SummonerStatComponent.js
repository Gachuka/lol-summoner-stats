import './SummonerStatComponent.scss'
import {getSummoner} from '../../utilities/utilities.js'

import {useEffect, useState} from 'react'

function SummonerStatComponent() {

  const summonerName = 'Gachuka'
  const [ summonerData, setSummonerData ] = useState()

  useEffect(() => {
    getSummoner(summonerName).then((res) => {
      setSummonerData(res.data)
      console.log(res.data)
    })
  },[])

  if (!summonerData) {
    <h1>Loading</h1>
  }

  return (
    <div className='ssc'>
      <div className='ssc__container'>
        <h1>{summonerData['name']}</h1>
        <button>Refresh</button>
      </div>
    </div>
  )
}

export default SummonerStatComponent