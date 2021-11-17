const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket } = require('../models/models')

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role },
    process.env.SECRET_KEY, { expiresIn: '24h' })
}

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body
    if (!email || !password) {
      return next(ApiError.badRequest())
    }

    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      return next(ApiError.badRequest("Пользователь с таким email уже существует"))
    }

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ email, role, password: hashPassword })
    const token = generateJwt(user.id, email, role)

    return res.json({ token })
  }

  async login(req, res, next) {
    const { email, password } = req.body
    const user = await User.findOne({ where: {email} })
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!user) {
      return next(ApiError.internal('Пользователь не найден'))
    }
    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль'))
    }
    const token = generateJwt(user.id, user.email, user.role)
    return res.json({ token })

  }


  async check(req, res, next) {
  }


}

module.exports = new UserController();
