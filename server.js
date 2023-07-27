const express = require('express')
const app = express()
const database = require('./database.js')

app.get("/users", async (req, res) => {
  const users = await database.getUsers()
  res.send(users[0])
})

app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3000, () => {
  console.log('Connected to port 3000')
})