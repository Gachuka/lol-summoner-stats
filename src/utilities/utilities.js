import axios from "axios"

const apiKey = 'RGAPI-89e08fa5-6d5f-4769-9f5e-c5aa8d88ab45'
const apiUrl = 'https://na1.api.riotgames.com/'
const requestbySummonerName = 'lol/summoner/v4/summoners/by-name/'

export const getSummoner = (summonerName) => {
  return axios.get(`${apiUrl}${requestbySummonerName}${summonerName}?api_key=${apiKey}`)
}