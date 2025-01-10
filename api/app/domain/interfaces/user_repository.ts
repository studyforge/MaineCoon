import UserEntity from '../entites/user_entity.js'

export abstract class IUserRepository {
  abstract create(user: UserEntity): Promise<UserEntity>
  abstract test(): void
}
