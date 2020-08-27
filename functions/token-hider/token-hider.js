const axios = require('axios')
const qs = require('qs')
const fetch = require('node-fetch')

exports.handler = async function(event, context) {
  // apply our function to the queryStringParameters and assign it to a variable
  const API_PARAMS = event.queryStringParameters.name
  console.log('API_PARAMS', API_PARAMS)
  // Get env var values defined in our Netlify site UI

  // TODO: customize your URL and API keys set in the Netlify Dashboard
  // this is secret too, your frontend won't see this
  const { API_SECRET } = process.env
  const URL = `https://neutrinoapi.net/bad-word-filter?content=${API_PARAMS}&user-id=kevingstanisz&api-key=${API_SECRET}`

  console.log('Constructed URL is ...', URL)

  try {
    const response = await fetch(URL, {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
