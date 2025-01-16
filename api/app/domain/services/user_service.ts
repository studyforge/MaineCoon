import { inject } from '@adonisjs/core'
import { UserRepository } from '../repositories/user_repository.js'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

@inject()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async create(): Promise<string> {
    return await this.userRepository.create()
  }

  public async login({ request, auth, response }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])
    try {
      const token = await auth.use('api').attempt(email, password)
      return response.send({ token })
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }
}
