import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import UserService from '../../../domain/services/user_service.js'

@inject()
export default class UserController {
  constructor(private userService: UserService) {}

  async create({ request, response }: HttpContext) {
    const { fullName, email, password } = request.only(['fullName', 'email', 'password'])
    const user = await this.userService.createUser(fullName, email, password)
    console.log(user)
    return response.json(user)
  }
}
