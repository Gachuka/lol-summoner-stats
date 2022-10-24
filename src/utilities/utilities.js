import axios from "axios"

const apiKey = 'api_key=RGAPI-a380aef7-dc63-49c6-9604-79e9e02ba6df'
const apiSummonerUrl = 'https://na1.api.riotgames.com/'
const apiMatchHistoryUrl = 'https://americas.api.riotgames.com/'
const requestSummonerBySummonerName = 'lol/summoner/v4/summoners/by-name/'
const requestSummonerByPUUID = 'lol/summoner/v4/summoners/by-puuid/'
const requestMatchByPUUIDlol = 'lol/match/v5/matches/by-puuid/'
const requestMatchByMatchId = 'lol/match/v5/matches/'


export const getSummonerByName = (summonerName) => {
  return axios.get(`${apiSummonerUrl}${requestSummonerBySummonerName}${summonerName}?${apiKey}`)
}

// export const getSummonerByPUUID = (summonerPUUID) => {
//   console.log(summonerPUUID)
//   return axios.get(`${apiSummonerUrl}${requestSummonerByPUUID}${summonerPUUID}?${apiKey}`)
// }

export const getMatchHistoryByPUUID = (PUUID) => {
  return axios.get(`${apiMatchHistoryUrl}${requestMatchByPUUIDlol}${PUUID}/ids?start=0&count=50&${apiKey}`)
}

export const getMatchByMatchId = (MatchId) => {
  return axios.get(`${apiMatchHistoryUrl}${requestMatchByMatchId}${MatchId}?${apiKey}`)
}

// https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/DnYf9rH7-Z30KSFMavGWZiyZqAXgvBXB0gkr288PZVux2TQxRWfAGzQ8Z1xrsTus-yFyTcZBGdKqsA?api_key=RGAPI-326fae6d-e46e-4354-a69c-2c59bc6b2398