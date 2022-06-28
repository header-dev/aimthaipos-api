const { Op } = require("sequelize");
const db = require("../config/db.config");
const Table = db.tables;

exports.create = (req, res) => {
  console.log(req.body);
  Table.upsert(req.body, {
    returning: true,
  })
    .then(function (result) {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(502).json({
        message: err.message,
      });
    });
};

exports.findAll = (req, res) => {
  let query = null;
  const { q } = req.query;
  if (req.query.q) {
    query = {
      table_name: {
        [Op.like]: `%${req.query.q}%`,
      },
    };
  }

  Table.findAll({
    where: query,
  })
    .then((table) => {
      res.json(table);
    })
    .catch((err) => res.status(502).send(err));
};

exports.findOne = (req, res) => {
  Table.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((table) => {
      res.json(table);
    })
    .catch((err) =>
      res.status(502).json({
        message: err.message,
      })
    );
};

exports.update = (req, res) => {
  Table.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((table) => {
      if (table) {
        res.json({
          message: "The user has update successful.",
        });
      }
    })
    .catch((err) => {
      res.status(502).json({
        message: err.message,
      });
    });
};

exports.destroy = (req, res) => {
  Table.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((table) => {
      if (table) {
        res.json({
          message: "The table has removed.",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(502).send(err);
    });
};
