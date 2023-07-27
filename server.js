const express = require('express')
const app = express()
const database = require('./database.js')

//database.setup('users')

app.use(express.json())

app.get("/users", async (req, res) => {
  const users = await database.getUsers()
  res.send(users[0])
})

app.post("/users", async (req, res) => {
  console.log(req)
  const user = await database.createUser(req.body.id, req.body.name, req.body.email, req.body.password)
  res.send(user)
})


app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3000, () => {
  console.log('Connected to port 3000')
})