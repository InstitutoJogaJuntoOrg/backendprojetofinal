const jwtValidator = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) return res.send(403).json({ msg: "Jwt Token not provided." });

  const jwtPayload = jwt.verify(authToken, secretKey);
  if (!jwtPayload) return res.send(403).json({ msg: "Jwt token not valid." });

  req.body.userEmail = jwtPayload.email;

  next();
};

module.exports = jwtValidator;
