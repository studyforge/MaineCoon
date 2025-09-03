import { AuthRepository } from '../../domain/repositories/auth_repository.js'
import User from '../models/user.js'

export class PgAuthRepository implements AuthRepository {
  public async create(user: User): Promise<User> {
    return await User.create(user)
  }

  public async findById(userId: number): Promise<User | null> {
    return await User.find(userId)
  }
}
