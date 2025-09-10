import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator } from '../validators/register_validator.js'
import { loginValidator } from '../validators/login_validator.js'
import { Logger } from '@adonisjs/core/logger'
import { inject } from '@adonisjs/core'
import AuthService from '../../domain/services/auth_service.js'
import { CreateUserDto } from '../../application/dtos/create_user_dto.js'

@inject()
export default class AuthController {
  constructor(private logger: Logger, private authService: AuthService) {}

  async register({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(registerValidator)
      const user = await this.authService.register(payload as CreateUserDto)
      return response.created(user)
    } catch (error) {
      this.logger.error(error)
      return response.badRequest({ message: 'Invalid data' })
    }
  }

  async login({ request, response }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(loginValidator)
      const { user, token } = await this.authService.login(email, password)
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
      await this.authService.logout(user, token)
      return response.ok({ message: 'Logged out' })
    } catch (error) {
      this.logger.error(error)
      return response.badRequest({ message: 'Token not found' })
    }
  }
}
