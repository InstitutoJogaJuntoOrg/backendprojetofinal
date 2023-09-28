const { Database } = require("../../config");

const dbInstance = Database();

module.exports = {
  getProducts: async (req, res) => {
    const query = `
      select
        p.*
      from
        produtos p
      where
        p.idusuario = '${req.body.userId}';
    `;

    try {
      const [rows] = await dbInstance.promise().query(query);

      return res.json(rows);
    } catch (e) {
      console.log("e: ", e);
      res.status(500).json({ error: "Erro ao fazer login" });
    }
  },

  addProduct: async (req, res) => {
    try {
      const query = `INSERT INTO produtos (name, description, price, category, shipment, image, idusuario) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const params = [
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.category,
        req.body.shipment,
        req.file.filename,
        req.body.userId,
      ];

      await dbInstance.promise().query(query, params);

      return res.status(200).json("Produto cadastrado com sucesso!");
    } catch (e) {
      console.log("e: ", e);
      res.status(500).json({ error: "Erro ao fazer login" });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const query = `delete from produtos where idprodutos = ${req.params.id}`;
      await dbInstance.promise().query(query);

      res.status(200).json("Produto deletado com sucesso!");
    } catch (e) {
      console.log("e: ", e);
      res.status(500).json({ error: "Erro ao fazer login" });
    }
  },
};
