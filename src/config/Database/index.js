const mysql = require("mysql2");

let connInstance;

const getInstance = () => {
  if (connInstance) return connInstance;

  connInstance = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  return connInstance;
};

module.exports = getInstance;
