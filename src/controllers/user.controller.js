const { Op } = require("sequelize");
const db = require("../config/db.config");
const Users = db.users;
const Role = db.roles;

const addRole = (userId, roleId) => {
  return Users.findByPk(userId)
    .then((user) => {
      if (!user) {
        console.log("user not found!");
        return null;
      }
      return Role.findByPk(roleId).then((role) => {
        if (!role) {
          return null;
        }

        user.addRole(role);
        return user;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Tutorial to Tag: ", err);
    });
};

const removeRole = (userId, roleId) => {
  return Users.findByPk(userId)
    .then((user) => {
      if (!user) {
        console.log("user not found!");
        return null;
      }
      // user.removeRoles([roleId]);
      console.log(user);
    })
    .catch((err) => {
      console.log(">> Error while adding Tutorial to Tag: ", err);
    });
};

exports.create = (req, res) => {
  Users.create({
    code: req.body.code,
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(400).send(err));
};

exports.findAllRole = (req, res) => {
  Role.findAll()
    .then((role) => {
      res.json(role);
    })
    .catch((err) => res.status(400).send(err));
};

exports.findAll = (req, res) => {
  let query = null;
  if (req.query) {
    query = {
      [Op.or]: [
        {
          firstname: {
            [Op.like]: `%${req.query.q}%`,
          },
        },
        {
          lastname: {
            [Op.like]: `%${req.query.q}%`,
          },
        },
        {
          email: {
            [Op.like]: `%${req.query.q}%`,
          },
        },
      ],
    };
  }

  Users.findAll({
    where: query,
    include: [
      {
        model: Role,
        as: "roles",
        required: false,
      },
    ],
  })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(502).json(err)
    });
};

exports.findOne = (req, res) => {
  Users.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      res.json(user);
    })
    .catch((err) =>
      res.status(502).json({
        message: err.message,
      })
    );
};

exports.update = (req, res) => {
  const { code, username, firstname, lastname, email, roleId } = req.body;

  Users.update(
    {
      code: code,
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(() => {
      if (roleId) {
        return db.user_role.destroy({
          where: {
            userId: req.params.id,
          },
        });
      } else {
        return true;
      }
    })
    .then(() => {
      return addRole(req.params.id, roleId);
    })
    .then((result) => {
      if (result) {
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

exports.resetPassword = (req, res) => {
  const { password } = req.body;

  Users.update(
    {
      password: password,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((user) => {
      if (user) {
        res.json({
          message: "The reset password has successful.",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(502).json({
        message: err.message,
      });
    });
};

exports.destroy = (req, res) => {
  Users.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      if (user) {
        res.json({
          message: "The user has removed.",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};
