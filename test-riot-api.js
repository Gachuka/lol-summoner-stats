// From https://developer.riotgames.com/
// Log in to game account
// Go to dashboard to regenerate API key

const apiKey = 'RGAPI-89e08fa5-6d5f-4769-9f5e-c5aa8d88ab45'

const apiUrl = 'https://na1.api.riotgames.com/'
const requestbySummonerName = 'lol/summoner/v4/summoners/by-name/'
const summonerName = 'Gachuka'

// REQUEST BY SUMMONER NAME

const summonerAccountGet = `${apiUrl}${requestbySummonerName}${summonerName}?api_key=${apiKey}`

// Match IDs by player PUUID
// https://developer.riotgames.com/apis#match-v5/GET_getMatchIdsByPUUID
// match-ids.json