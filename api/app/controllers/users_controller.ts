import { UserService } from '#services/user_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  public async create({ response }: HttpContext) {
    return response.send(await this.userService.create())
  }
}
