import './SummonerStatComponent.scss'

import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import MatchCard from '../MatchCard/MatchCard'
import BackgroundComponent from '../BackgroundComponent/BackgroundComponent'

function SummonerStatComponent() {

  const versionNumber = "13.1.1"

  const { summonerName } = useParams()
  const [ summonerData, setSummonerData ] = useState()
  const [ matchHistoryList, setMatchHistoryList ] = useState([])

  useEffect(() => {

    async function fetchSummoner() {
      const getSummonerByName = `/.netlify/functions/getSummonerByName?summonerName=${summonerName}`;
      const getMatchHistoryByPUUID = `/.netlify/functions/getMatchHistoryByPUUID?PUUID=`;
      const getMatchByMatchId = `/.netlify/functions/getMatchByMatchId?MatchId=`
      try {
        // setLoading(true);
        const summoner = await fetch(getSummonerByName).then((res) => res.json());
        console.log(summoner.data)
        setSummonerData(summoner.data)
        const fetched = await fetch(`${getMatchHistoryByPUUID}${summoner.data.puuid}`).then((res) => res.json());
        console.log(fetched.data)

        const promises = []
        const matchHistoryDataArray = []
        for (let i = 0; i < 10; i++) {
          promises.push(
            fetch(`${getMatchByMatchId}${fetched.data[i]}`).then((res) => res.json())
            .then((res) => matchHistoryDataArray.push(res.data.info))
            .catch((error) => {console.log(error.message)})
          )
        }
        Promise.all(promises).then(() => {
          // Sort the matches by most recent to least recent
          const sortedMatchHistoryData = [...matchHistoryDataArray].sort((a, b) => {
            return b.gameCreation - a.gameCreation
          })
          setMatchHistoryList(sortedMatchHistoryData)
        });
      } catch (err) {
        console.log(err);
      } finally {
        // setLoading(false);
      }
    }
    fetchSummoner();

    // getSummonerByName(summonerName)
    // .then((res) => {
    //   console.log(res.data)
    //   setSummonerData(res.data)
    //   return getMatchHistoryByPUUID(res.data.puuid)
    // })
    // .then((resMatchHistoryByPUUID) => {

    //   const promises = []
    //   const matchHistoryDataArray = []
    //   for (let i = 0; i < 10; i++) {
    //     promises.push(getMatchByMatchId(resMatchHistoryByPUUID.data[i]).then((res) => {
    //       matchHistoryDataArray.push(res.data.info)
    //     }).catch((error) => {console.log(error.message)}))
    //   }
    //   Promise.all(promises).then(() => {
    //     // Sort the matches by most recent to least recent
    //     const sortedMatchHistoryData = [...matchHistoryDataArray].sort((a, b) => {
    //       return b.gameCreation - a.gameCreation
    //     })
    //     setMatchHistoryList(sortedMatchHistoryData)
    //   });

    // }).catch((error) => {
    //   console.log(error.message)
    // })
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
    <section className='ssc'>
      <div className='ssc__container'>
        <BackgroundComponent 
          image={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Samira_1.jpg`}
        />
        <div className='ssc__profile profile'>
          <div className='profile__container'>
            <div className='profile__level'>{summonerData.summonerLevel}</div>
            <div className="profile__icon icon">
              <div className='icon__notch'></div>
              <img 
                className='icon__image'
                src={`https://ddragon.leagueoflegends.com/cdn/${versionNumber}/img/profileicon/${summonerData.profileIconId}.png`}
                alt="profile icon" 
              />
            </div>
          </div>
          <div className='profile__info info'>
            <span className='info__name'>{summonerData['name']}</span>
          </div>
        </div>
        <button className='info__button' onClick={handleRefresh}>Update</button>
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
    </section>
  )
}

export default SummonerStatComponent