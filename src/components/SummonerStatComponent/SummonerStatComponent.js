import './SummonerStatComponent.scss'

import {
  useState,
  useRef,
  useCallback
} from 'react'
import {useParams} from 'react-router-dom'

import useGetMatches from '../../hooks/useGetMatches'

import MatchCardTEST from '../MatchCardTEST/MatchCardTEST'
import BackgroundComponent from '../BackgroundComponent/BackgroundComponent'
import MatchCardLoading from '../MatchCardLoading/MatchCardLoading'

function SummonerStatComponent() {

  const versionNumber = "13.6.1"

  const { summonerName } = useParams()

  const [ setOf10, setSetOf10 ] = useState(10)
  const {
    isLoading,
    isError,
    error,
    results,
    hasNextPage,
    summoner
  } = useGetMatches(summonerName, setOf10)

  const intObserver = useRef()
  const lastMatchCardRef = useCallback(matchCard => {
    if (isLoading) return

    if (intObserver.current) intObserver.current.disconnect()

    intObserver.current = new IntersectionObserver(matchCards => {
      if (matchCards[0].isIntersecting && hasNextPage) {
        console.log("We are near the last match card!")
        setSetOf10(prev => prev + 10)
      }
    })

    if (matchCard) intObserver.current.observe(matchCard)
  }, [isLoading, hasNextPage])

  const handleRefresh = () => {
    window.location.reload()
  }
  
  if (isError) return <p>Error: {error.message}</p>
  
  const summonerInfoContent = (
    summoner &&
    <div className='ssc__profile profile'>
      <div className='profile__container'>
        <div className='profile__level'>{summoner.summonerLevel}</div>
        <div className="profile__icon icon">
          <div className='icon__notch'></div>
          <img 
            className='icon__image'
            src={`https://ddragon.leagueoflegends.com/cdn/${versionNumber}/img/profileicon/${summoner.profileIconId}.png`}
            alt="profile icon" 
          />
        </div>
      </div>
      <div className='profile__info info'>
        <span className='info__name'>{summoner['name']}</span>
      </div>
    </div>
  )

  const matchHistoryContent = results.map((match, i) => {
    if (results.length === i + 1) {
      return (
        <MatchCardTEST 
          ref={lastMatchCardRef}
          key={match.gameId}
          matchData={match}
          summonerName={summonerName}
          versionNumber={versionNumber}
        />
      )
    }

    return (
      <MatchCardTEST 
        key={match.gameId}
        matchData={match}
        summonerName={summonerName}
        versionNumber={versionNumber}
      />
    )
  })

  return (
    <section className='ssc'>
      <div className='ssc__container'>
        <BackgroundComponent 
          image={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Samira_1.jpg`}
        />
        {summonerInfoContent}
        <button className='info__button' onClick={handleRefresh}>Update</button>
        <div className='match-history'>
          {matchHistoryContent}
        </div>
        {isLoading && <MatchCardLoading />}
      </div>
    </section>
  )
}

export default SummonerStatComponent