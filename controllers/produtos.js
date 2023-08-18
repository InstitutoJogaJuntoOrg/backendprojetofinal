import { db } from "../db.js";
import bcrypt from "bcrypt";
const saltRounds = 10;
import jwt from 'jsonwebtoken';
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
    const queryUser = `select * from usuarios where email = '${req.body.userEmail}'`
     const queryInsertProduct =
       "INSERT INTO produtos (`name`, `description`, `price`, `category`, `shipment`, `image`, `idusuario`) VALUES (?, ?, ?, ?, ?, ?, ?)";
     const queryInsertProductParams = [
       req.body.name,
       req.body.description,
       req.body.price,
       req.body.category,
       req.body.shipment,
       `${req.protocol}://${req.get('main.d3cntnqyy0l6l0.amplifyapp.com')}/${req.file.filename}`
     ];

     db.query(queryUser, (err, value) => {
       if (err) {
         console.log(err);
         return res.status(500).json({ error: "Erro ao encontrar usuario no banco" });
       }

       if(value.length == 0)
         return res.status(500).json({error: "Usuario nao encontrado"})

       queryInsertProductParams.push(value[0].idusuarios)
       db.query(queryInsertProduct, queryInsertProductParams, (err) => {
         if (err) {
           console.log(err);
           return res.status(500).json({ error: "Erro ao adicionar produto" });
         }
         return res.status(200).json("Produto cadastrado com sucesso!");
       });
     });
  };

  export const deleteProducts = (req, res) => {
    const q = "DELETE FROM produtos WHERE `id` = ?";

    db.query(q, [req.params.id], (err) => {
        if (err) return res.json(err)

        return res.status(200).json('usuario deletado com sucesso')
    })
}
export const Login = (req, res) => {
  console.log('Chegamos no Login');
  const email = req.body.email;
  const password = req.body.password;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching user' });
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (error) {
          res.status(500).json({ error: 'Error comparing passwords' });
        }

        if (response) {
          const user = result[0];

          // Gerar o token JWT com informações do usuário
          const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, {
            expiresIn: '24h',
          });

          delete user.password;

          res.status(200).json({ msg: 'Usuário logado com sucesso!', token: token, user });
        } else {
          res.status(401).json({ msg: 'Senha incorreta' }); // Retornar a mensagem no corpo da resposta
        }
      });
    } else {
      res.status(401).json({ msg: 'Usuário não registrado!' });
    }
  });
};


export const Register = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Erro ao verificar usuário no banco de dados" });
    }

    if (result.length == 0) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
          "INSERT INTO usuarios (email, password) VALUES (?,?)",
          [email, hash],
          (error, response) => {
            console.log('error: ', error)
            console.log('response: ', response)
            if (err) {
              console.log('err: ', err)
              res.status(500).json({ error: "Erro ao cadastrar usuário" });
            }

            res.status(200).json({ msg: "Usuário cadastrado com sucesso" });
          }
        );
      });
    } else {
      res.status(409).json({ error: "Email já cadastrado" });
    }
  });
};