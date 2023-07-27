const dotenv = require('dotenv')
const mysql = require('mysql2')
dotenv.config()

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database:process.env.MYSQL_DATABASE
}).promise()

////////////////////////////////////////////////////////
////////////////////// Run Server //////////////////////
////////////////////////////////////////////////////////
module.exports.getUsers = async function getUsers() {
  const users = await pool.query("Select * from users")
  return users
}
module.exports.createUser =  async function createUser(name, email, password)
{
  const user = await pool.query(`INSERT INTO users VALUES (?, ?, ?);`, [name, email, password])
  return user
}
module.exports.getUserByName =  async function getUserByName(name) 
{
  const user = await pool.query(`Select * from users where name = ?`, [name])
  return user[0][0]
}