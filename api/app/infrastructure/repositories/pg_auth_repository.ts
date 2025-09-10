import { AccessToken } from '@adonisjs/auth/access_tokens';
import { AuthRepository } from '../../domain/repositories/auth_repository.js'
import User from '../models/user.js'

export class PgAuthRepository implements AuthRepository {
  public async create(user: User): Promise<User> {
    return await User.create(user)
  }

  public async findById(userId: number): Promise<User | null> {
    return await User.find(userId)
  }

  public async login(email: string, password: string): Promise<{ user: User; token: AccessToken }> {
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)
    return { user, token }
  }

  public async logout(user: User, token: string): Promise<void> {
      await User.accessTokens.delete(user, token)
  }
}
