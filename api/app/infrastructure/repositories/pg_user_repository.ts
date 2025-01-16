import { UserRepository } from '../../domain/repositories/user_repository.js'
import User from '../models/user.js'

export class PgUserRepository implements UserRepository {
  public async create(): Promise<string> {
    return 'Create user with success lets goooo'
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await User.query().where('email', email).first()
  }
}
