var express = require('express')
var router = express.Router()
const axios = require('axios')

/* GET home page. */
router.get('/', async function (req, res, next) {
  const { searchText } = req.query

  try {
    const result = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${searchText}&key=${process.env.YOUTUBE_API_KEY}`)
    if (result) {
      const { status, data } = result
      if (status === 200 && data && data.items) {
        return res.json({ statusCode: 200, message: data.items })
      }
    }
  }catch(error) {
    console.log(error)
  }

  return res.json({ statusCode: 500, message: 'An error occurred fetching videos' })
})

module.exports = router