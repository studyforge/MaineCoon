import { inject } from '@adonisjs/core'
import UserEntity from '../entites/user_entity.js'
import { IUserRepository } from '../interfaces/user_repository.js'

@inject()
export default class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(name: string, email: string, password: string): Promise<UserEntity> {
    this.userRepository.test()
    const user = new UserEntity('', name, email, password)
    return user
  }
}
