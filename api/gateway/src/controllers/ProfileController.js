const axios = require('axios')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async store(req, res) {
    try {
      const buffer = Buffer.from(req.body.photo, 'base64')
      const id = uuidv4()
      fs.writeFileSync(`./photos/${id}.png`, buffer)
      req.body.photo = `/photos/${id}.png`
      const response = await axios.post(`${process.env.AUTHENTICATION_URL}/create`, req.body)
      return res.json(response.data)
    } catch (e) {
      res.status(e.response.status);
      return res.json(e.response.data)
    }
  },

  async login(req, res) {
    try {
      const response = await axios.post(`${process.env.AUTHENTICATION_URL}/login`, req.body)
      return res.json(response.data)
    } catch (e) {
      res.status(e.response.status);
      return res.json(e.response.data)
    }
  },

  async get(req, res) {
    try {
      const response = await axios.get(`${process.env.AUTHENTICATION_URL}/profile?id=${req.user._id}`)
      return res.json(response.data)
    } catch (e) {
      res.status(e.response.status);
      return res.json(e.response.data)
    }
  },

  async update(req, res) {
    try {
      const response = await axios.put(`${process.env.AUTHENTICATION_URL}/profile?id=${req.user._id}`, req.body)
      return res.json(response.data)
    } catch (e) {
      res.status(e.response.status);
      return res.json(e.response.data)
    }
  },

  async recycleToken(req, res) {
    try {
      const response = await axios.get(`${process.env.AUTHENTICATION_URL}/refresh-token?id=${req.user._id}`)
      return res.json(response.data)
    } catch (e) {
      res.status(e.response.status);
      return res.json(e.response.data)
    }
  },

  async confirmEmail(req, res) {
    try {
      const response = await axios.get(`${process.env.AUTHENTICATION_URL}/confirm?token=${req.query.token}`)
      return res.send(response.data)
    } catch (e) {
      res.status(e.response.status);
      return res.send(e.response.data)
    }
  },

  async requestChangePassword(req, res) {
    try {
      const response = await axios.post(`${process.env.AUTHENTICATION_URL}/request-change-password`, req.body)
      return res.json(response.data)
    } catch (e) {
      res.status(e.response.status);
      return res.json(e.response.data)
    }
  },

  async changePassword(req, res) {
    try {
      const response = await axios.post(`${process.env.AUTHENTICATION_URL}/change-password`, req.body)
      return res.json(response.data)
    } catch (e) {
      res.status(e.response.status);
      return res.json(e.response.data)
    }
  },
  
  async destroyProfile(req, res) {
    try {
      const response = await axios.delete(`${process.env.AUTHENTICATION_URL}/profile?id=${req.user._id}`)
      return res.json(response.data)
    } catch (e) {
      res.status(e.response.status);
      return res.json(e.response.data)
    }
  }
}
