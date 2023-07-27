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
module.exports.createUser =  async function createUser(id, name, email, password)
{
  const user = await pool.query(`INSERT INTO users VALUES (?, ?, ?, ?);`, [id, name, email, password])
  return user
}
module.exports.getUserByName =  async function getUserByName(name) 
{
  const user = await pool.query(`Select * from users where name = ?`, [name])
  return user[0][0]
}

module.exports.setup = async function setup(table)
{
  const createdtable = await pool.query(`Create table if not exists ${table} (id Int auto_increment primary key, name Varchar(50) not null, email Varchar(50) not null, password varchar(50) not null)`)
  console.log(`Created table ${table}`)
}