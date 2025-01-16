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

  public async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    try {
      const token = await auth.use('api').attempt(email, password)
      return response.send({ token })
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }
}
