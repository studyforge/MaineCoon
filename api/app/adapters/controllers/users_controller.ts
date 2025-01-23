import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { UserService } from '../../domain/services/user_service.js'
import { registerValidator } from '../validators/register_validator.js'
import { CreateUserDto } from '../../application/dtos/create_user_dto.js'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  public async create({ response, request }: HttpContext) {
    const userDto: CreateUserDto = request.only(['email', 'password'])
    const payload = await registerValidator.validate(userDto)
    return response.send(await this.userService.create())
  }

  public async me({ response, auth }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      return response.ok(user)
    } catch (error) {
      return response.unauthorized({ error: 'User not found' })
    }
  }
}
