import { useEffect, useState } from "react";
import { getMatchHistoryByPUUID, getMatchByMatchId, getSummonerByName } from "../utilities/utilities";

const useGetMatches = (summonerName, setOf10 = 10) => {
  const [results, setResults] = useState([])
  const [summoner, setSummoner] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState({})
  const [hasNextPage, setHasNextPage] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setIsError(false)
    setError({})

    const controller = new AbortController()
    const { signal } = controller

    getSummonerByName(summonerName)
    .then((res) => {
      setSummoner(res.data)
      return getMatchHistoryByPUUID(res.data.puuid, setOf10)
    })
    .then(data => {

      const fetched = data.data
      const promises = []
      const matchHistoryDataArray = []

      for (let i = 0; i < 10; i++) {
        promises.push(
          getMatchByMatchId(fetched[i])
          .then((res) => matchHistoryDataArray.push(res.data.info))
          .catch((error) => {console.log(error.message)})
        )
      }

      Promise.all(promises).then(() => {
        // Sort the matches by most recent to least recent
        const sortedMatchHistoryData = [...matchHistoryDataArray].sort((a, b) => {
          return b.gameCreation - a.gameCreation
        })
        // setMatchHistoryList(sortedMatchHistoryData)
        setResults(prev => [...prev, ...sortedMatchHistoryData])
        setHasNextPage(Boolean(data.data.length))
        setIsLoading(false)
      })

    })
    .catch(e => {
      console.log("Something happend in useGetMatches: ", e.message)
      setIsLoading(false)
      if (signal.aborted) return
      setIsError(true)
      setError({ message: e.message })
    })

    return () => controller.abort();

  },[setOf10, summonerName])

  return { isLoading, isError, error, results, hasNextPage, summoner }
}

export default useGetMatches;