const axios = require("axios");

const API_KEY = process.env.REACT_APP_API_KEY

const apiSummonerUrl = 'https://na1.api.riotgames.com/'
const requestSummonerBySummonerName = 'lol/summoner/v4/summoners/by-name/'

exports.handler = async function (event, context) {
  // console.log(event);
  // console.log(context);
  try {
    const { summonerName } = event.queryStringParameters;
    const response = await axios.get(`${apiSummonerUrl}${requestSummonerBySummonerName}${summonerName}?api_key=${API_KEY}`);
    return {
      statusCode: 200,
      body: JSON.stringify({ data: response.data }),
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};