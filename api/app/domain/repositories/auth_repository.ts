import { AccessToken } from '@adonisjs/auth/access_tokens';
import User from '../../infrastructure/models/user.js'

export abstract class AuthRepository {
  public abstract create(user: User): Promise<User>
  public abstract findById(userId: number): Promise<User | null>
  public abstract login(email: string, password: string): Promise<{ user: User; token: AccessToken }>
  public abstract logout(user: User, token: string | number | BigInt): Promise<void>
}
