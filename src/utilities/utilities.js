import axios from "axios"

const API_KEY = process.env.REACT_APP_API_KEY

const apiSummonerUrl = 'https://na1.api.riotgames.com/'
const apiMatchHistoryUrl = 'https://americas.api.riotgames.com/'
const requestSummonerBySummonerName = 'lol/summoner/v4/summoners/by-name/'
// const requestSummonerByPUUID = 'lol/summoner/v4/summoners/by-puuid/'
const requestMatchByPUUIDlol = 'lol/match/v5/matches/by-puuid/'
const requestMatchByMatchId = 'lol/match/v5/matches/'

export const getSummonerByName = (summonerName) => {
  // console.log("getting by name")
  return axios.get(`${apiSummonerUrl}${requestSummonerBySummonerName}${summonerName}?api_key=${API_KEY}`)
}

// export const getSummonerByPUUID = (summonerPUUID) => {
//   console.log(summonerPUUID)
//   return axios.get(`${apiSummonerUrl}${requestSummonerByPUUID}${summonerPUUID}?api_key=${API_KEY}`)
// }

export const getMatchHistoryByPUUID = (PUUID) => {
  // console.log("getting by puuid")
  return axios.get(`${apiMatchHistoryUrl}${requestMatchByPUUIDlol}${PUUID}/ids?start=0&count=50&api_key=${API_KEY}`)
}

export const getMatchByMatchId = (MatchId) => {
  // console.log("getting by match id")
  return axios.get(`${apiMatchHistoryUrl}${requestMatchByMatchId}${MatchId}?api_key=${API_KEY}`)
}

export const getQueueIds = () => {
  // console.log("getting queue id")
  return axios.get(`https://static.developer.riotgames.com/docs/lol/queues.json`)
}

// https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/DnYf9rH7-Z30KSFMavGWZiyZqAXgvBXB0gkr288PZVux2TQxRWfAGzQ8Z1xrsTus-yFyTcZBGdKqsA?api_key=RGAPI-326fae6d-e46e-4354-a69c-2c59bc6b2398