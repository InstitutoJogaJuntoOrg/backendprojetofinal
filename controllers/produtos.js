import { db } from "../db.js";
import bcrypt from "bcrypt";
const saltRounds = 10;
import jwt from "jsonwebtoken";
import { secretKey } from "../tokens/secret-token.js";

export const getProducts = (req, res) => {
  const q = `
  select p.* from produtos p
  join usuarios u on u.idusuarios = p.idusuario
  where u.email = '${req.body.userEmail}';
  `;

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const addProducts = (req, res) => {
  const queryUser = `select * from usuarios where email = '${req.body.userEmail}'`;

  const queryInsertProduct =
    "INSERT INTO produtos (`name`, `description`, `price`, `category`, `shipment`, `image`, `idusuario`) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const queryInsertProductParams = [
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.category,
    req.body.shipment,
    req.file.filename,
  ];

  db.query(queryUser, (err, value) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "Erro ao encontrar usuario no banco", eMessage: err });
    }

    if (value.length == 0)
      return res
        .status(500)
        .json({ error: "Usuario nao encontrado", eMessage: err });

    queryInsertProductParams.push(value[0].idusuarios);
    db.query(queryInsertProduct, queryInsertProductParams, (err) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ error: "Erro ao adicionar produto", eMessage: err });
      }
      return res.status(200).json("Produto cadastrado com sucesso!");
    });
  });
};

export const deleteProducts = (req, res) => {
  const q = "DELETE FROM produtos WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("usuario deletado com sucesso");
  });
};
