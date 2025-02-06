import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator } from '../validators/register_validator.js'
import { loginValidator } from '../validators/login_validator.js'
import User from '../../infrastructure/models/user.js'
import { Logger } from '@adonisjs/core/logger'
import { inject } from '@adonisjs/core'

@inject()
export default class AuthController {
  constructor(private logger: Logger) {}

  async register({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(registerValidator)
      const user = await User.create(payload)
      this.logger.info(`User ${user.id} created`)
      return response.created(user)
    } catch (error) {
      this.logger.error(error)
      return response.badRequest({ message: 'Invalid data' })
    }
  }

  async login({ request, response }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(loginValidator)
      const user = await User.verifyCredentials(email, password)
      const token = await User.accessTokens.create(user)
      this.logger.info(`User ${user.id} logged in`)
      return response.ok({
        token: token,
        ...user.serialize(),
      })
    } catch (error) {
      this.logger.error(error)
      return response.badRequest({ message: 'Invalid credentials' })
    }
  }

  async logout({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      const token = auth.user?.currentAccessToken.identifier
      if (!token) {
        return response.badRequest({ message: 'Token not found' })
      }
      await User.accessTokens.delete(user, token)
      this.logger.info(`User ${user.id} logged out`)
      return response.ok({ message: 'Logged out' })
    } catch (error) {
      this.logger.error(error)
      return response.badRequest({ message: 'Token not found' })
    }
  }
}
