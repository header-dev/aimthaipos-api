const db = require('../config/db.config');
const Product = db.products;
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/images/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}_${Date.now()}`);
  },
});

const upload = multer({ storage }).single('photo');

exports.addFavorite = (req, res) => {
  Product.update(
    {
      favorite: req.params.fav == 1 ? 0 : 1,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((product) => {
      if (product) {
        res.json({
          message: 'The menu added to favorite.',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(502).send(err);
    });
};

exports.findAllSale = (req, res) => {
  let queryProduct = null;
  let queryCategory = null;
  if (req.query.fav == 1) {
    queryProduct = {
      favorite: 1,
    };
  }

  if (req.query.name !== 'ALL' && req.query.prod !== undefined) {
    queryProduct = {
      ...queryProduct,
      name: {
        [Op.like]: req.query.name !== 'ALL' ? `%${req.query.name}%` : `%%`,
      },
    };
  }

  if (req.query.category !== 'Favorite' && req.query.category !== undefined) {
    queryCategory = {
      ...queryCategory,
      id: Number(req.query.category),
    };
  }

  Product.findAll({
    where: null,
    include: [
      {
        model: db.categories,
        where: queryCategory,
      },
    ],
  })
    .then((product) => {
      res.json(product);
    })
    .catch((err) =>
      res.status(502).json({
        message: err.message,
      })
    );
};

exports.uploadMenuPhoto = async (req, res) => {
  await sharp(req.file.path)
    .resize(200, 200)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(path.resolve(req.file.destination, 'menus', req.file.filename));
  fs.unlinkSync(req.file.path);

  Product.update(
    {
      photo: req.file.filename,
    },
    {
      where: {
        id: req.body.id,
      },
      returning: true,
    }
  )
    .then(function (result) {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(502).json({
        message: err.message,
      });
    });
};

exports.save = async (req, res) => {
  Product.upsert(req.body, {
    returning: true,
  })
    .then(function (result) {
      res.json(result[0]);
    })
    .catch((err) => {
      console.error(err);
      res.status(502).json({
        message: err.message,
      });
    });
};

exports.findAll = (req, res) => {
  let query = null;

  if (req.query.q) {
    query = {
      name: {
        [Op.like]: `%${req.query.q}%`,
      },
    };
  }

  Product.findAll({
    where: query,
    include: [
      {
        model: db.categories,
      },
      {
        model: db.printers,
        required: false,
      },
    ],
  })
    .then((partner) => {
      res.json(partner);
    })
    .catch((err) => res.status(400).send(err));
};

exports.findAllSubSet = (req, res) => {
  let query = null;

  if (req.query.q) {
    query = {
      name: {
        [Op.like]: `%${req.query.q}%`,
      },
    };
  }
  query = { ...query, subSetMenu: true };

  Product.findAll({
    where: query,
    include: [
      {
        model: db.categories,
      },
    ],
  })
    .then((partner) => {
      res.json(partner);
    })
    .catch((err) => res.status(400).send(err));
};

exports.findOne = (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: db.categories,
      },
    ],
  })
    .then((product) => {
      res.json(product);
    })
    .catch((err) =>
      res.status(502).json({
        message: err.message,
      })
    );
};

exports.destroy = (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (product) {
        res.json({
          message: 'The menu has removed.',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(502).send(err);
    });
};
