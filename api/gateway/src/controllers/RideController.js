const axios = require('axios')

module.exports = {
  async index(req, res) {
    try {
      const response = await axios.get(`${process.env.RIDE_URL}/near-rides`, req.query)
      return res.json(response.data)
    } catch (e) {
      res.status(e.response.status);
      return res.json(e.response.data)
    }
  },

  async store(req, res) {
    try {
      req.body.user = req.user
      const response = await axios.post(`${process.env.RIDE_URL}/ride`, req.body)
      return res.json(response.data)
    } catch (e) {
      console.log(e)
      res.status(e.response.status);
      return res.json(e.response.data)
    }
  },

  async destroyRide(req, res) {
    try {
      const response = await axios.delete(`${process.env.RIDE_URL}/ride?id=${req.user._id}`)
      return res.json(response.data)
    } catch (e) {
      res.status(e.response.status);
      return res.json(e.response.data)
    }
  }
}