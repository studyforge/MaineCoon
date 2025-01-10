import { inject } from '@adonisjs/core'
import { UserRepository } from '../repository/user_repository.js'

@inject()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  public async create(): Promise<string> {
    return await this.userRepository.create()
  }
}
