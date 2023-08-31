require("dotenv").config({ path: require("./utils").getEnvFilePath() });

const app = require("./server.js");

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`)
);
