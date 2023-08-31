const jwt = require("jsonwebtoken");

const jwtValidator = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken)
    return res.sendStatus(403).json({ msg: "Jwt Token not provided." });

  const tokenJwt = bearerToken.split(" ")[1];
  const jwtPayload = jwt.verify(tokenJwt, process.env.JWT_TOKEN);
  if (!jwtPayload)
    return res.sendStatus(403).json({ msg: "Jwt token not valid." });

  req.body.userId = jwtPayload.userId;

  next();
};

module.exports = jwtValidator;
