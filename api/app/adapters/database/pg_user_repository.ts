import User from '../../adonis/models/user.js'
import UserEntity from '../../domain/entites/user_entity.js'
import { IUserRepository } from '../../domain/interfaces/user_repository.js'

export class UserRepository implements IUserRepository {
  public async create(user: UserEntity): Promise<UserEntity> {
    const createdUser = await User.create({
      fullName: user.name,
      email: user.email,
      password: user.password,
    })

    return new UserEntity(createdUser.id.toString(), createdUser.fullName, createdUser.email)
  }

  public test(): void {
    console.log('Test')
  }
}
