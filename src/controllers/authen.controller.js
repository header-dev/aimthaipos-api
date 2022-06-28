const Sequelize = require("sequelize")
const Op = Sequelize.Op
const db = require("../config/db.config")
const Users = db.users
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const env = require('../config/env')

exports.login = (req, res) => {

    const { username, password } = req.body

    Users.findOne({
        where: {
            [Op.or]: [
                {
                    username: username,
                },
                {
                    code: username
                }
            ]
        }
    })
        .then((user) => {
            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    const token = jwt.sign({
                        sub: {
                            id: user.id,
                            code: user.code,
                            fullname: user.fullname,
                            username: user.username,
                            email: user.email,
                            signin_timestamp: new Date()
                        }
                    },
                        process.env.TOKEN_SECRET,
                        {}
                    )
                    res.json({ token })
                } else {
                    res.status(401).json({
                        message: "Incorrect password"
                    })
                }
            } else {
                res.status(401).json({
                    message: "Incorrect ID or Username"
                })
            }
        })
        .catch(err => res.status(400).send(err))
}