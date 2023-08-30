const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Database } = require("../../config");

const dbInstance = Database();

module.exports = {
  Login: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
      const [rows] = await dbInstance
        .promise()
        .query(`SELECT * FROM usuarios WHERE email = "${email}"`);

      if (rows.length == 0)
        return res.json({ msg: "Usuario nao encontrado com email informado" });

      const dbUser = rows[0];
      const doesPwdMatch = await bcrypt.compare(password, dbUser.password);
      if (!doesPwdMatch) return res.json({ msg: "Senha incorreta" });

      const jwtToken = jwt.sign({ userId: dbUser.id }, process.env.JWT_TOKEN, {
        expiresIn: "24h",
      });

      delete dbUser.password;

      res.status(200).json({
        msg: "Usuário logado com sucesso!",
        token: jwtToken,
        user: dbUser,
      });
    } catch (e) {
      console.log("e: ", e);
      res.status(500).json({ error: "Erro ao fazer login" });
    }
  },

  Register: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
      const [rows] = await dbInstance
        .promise()
        .query(`SELECT * FROM usuarios WHERE email = "${email}"`);

      if (rows.length > 0)
        return res.json({ msg: "Usuario ja existente com email informado" });

      const saltRounds = 10;
      const cryptedPwd = await bcrypt.hash(password, saltRounds);

      await dbInstance
        .promise()
        .query(
          `INSERT INTO usuarios (email, password) VALUES ("${email}", "${cryptedPwd}")`
        );

      res.status(200).json({ msg: "Usuário cadastrado com sucesso" });
    } catch (e) {
      console.log("e: ", e);
      res.status(500).json({ error: "Erro ao registrar usuario" });
    }
  },
};
