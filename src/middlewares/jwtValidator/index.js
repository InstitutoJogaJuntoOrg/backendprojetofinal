const jwt = require("jsonwebtoken");

const jwtValidator = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  console.log
  if (!bearerToken)
    return res.sendStatus(403).json({ msg: "Jwt Token not provided." });

  const tokenJwt = bearerToken.split(" ")[1];
  try {
    jwtPayload = jwt.verify(tokenJwt, process.env.JWT_TOKEN);
    console.log("jwt payload")
    console.log(bearerToken);
  } catch (error) {
    console.log(tokenJwt)
    console.log(process.env.JWT_TOKEN)
    return res.status(403).json({ "msg": "Jwt token not valid.",
    "token": tokenJwt 
  });
  }
    if (!jwtPayload)
    return res.sendStatus(403).json({ msg: "Jwt token not valid." });
  

  req.body.userId = jwtPayload.userId;

  next();
};

module.exports = jwtValidator;
