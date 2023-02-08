const axios = require("axios");

const API_KEY = process.env.REACT_APP_API_KEY

const apiMatchHistoryUrl = 'https://americas.api.riotgames.com/'
const requestMatchByMatchId = 'lol/match/v5/matches/'

exports.handler = async function (event, context) {
  // console.log(event);
  // console.log(context);
  try {
    const { MatchId } = event.queryStringParameters;
    const response = await axios.get(`${apiMatchHistoryUrl}${requestMatchByMatchId}${MatchId}?api_key=${API_KEY}`);
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