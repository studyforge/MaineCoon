import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { UserService } from '../../domain/services/user_service.js'
import { userValidator } from '../validators/user_validator.js'
import { CreateUserDto } from '../../application/dtos/create_user_dto.js'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  public async create({ response, request }: HttpContext) {
    const userDto: CreateUserDto = request.only(['email', 'password'])
    const payload = await userValidator.validate(userDto)
    return response.send(await this.userService.create())
  }
}
