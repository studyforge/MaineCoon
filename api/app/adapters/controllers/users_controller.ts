import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { Logger } from '@adonisjs/core/logger'

@inject()
export default class UsersController {
  constructor(private logger: Logger) {}

  public async me({ response, auth }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      this.logger.info(`User ${user.id} requested`)
      return response.ok(user)
    } catch (error) {
      this.logger.error(error)
      return response.unauthorized({ error: 'User not found' })
    }
  }
}
