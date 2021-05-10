const axios = require('axios')

module.exports = {
  async join(req, res) {
    try {
      req.body.user = req.user
      const response = await axios.post(`${process.env.MATCH_URL}/match`, req.body)
      return res.json(response.data)
    } catch (e) {
      res.status(e.response.status);
      return res.json(e.response.data)
    }
  },

  async index(req, res) {
    try {
      req.body.user = req.user
      const response = await axios.get(`${process.env.MATCH_URL}/match?id=${req.user._id}`)
      return res.json(response.data)
    } catch (e) {
      console.log(e)
      res.status(e.response.status);
      return res.json(e.response.data)
    }
  }
}