const mysql = require("mysql2");

let connInstance;

const getInstance = async () => {
  if (connInstance) return connInstance;

  connInstance = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  try {
    connInstance.connect();
    console.log("Sucefully connected to database");
  } catch (e) {
    console.error("Error in connecting to database");
  }

  return connInstance;
};

module.exports = getInstance;
