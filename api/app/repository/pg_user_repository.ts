import { UserRepository } from './user_repository.js'

export class PgUserRepository implements UserRepository {
  public async create(): Promise<string> {
    return 'Create user with success'
  }
}
