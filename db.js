import mysql from 'mysql'

export const db = mysql.createPool({
    host: "localhost",
    user: "admin",
    password: "1234",
    database: "banco",
  });