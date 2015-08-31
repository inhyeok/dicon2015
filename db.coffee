mysql = require 'mysql'
modul.exports.pool = pool = mysql.createPool {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'people'
}