import User from '../../infrastructure/models/user.js'

export abstract class UserRepository {
  public abstract create(): Promise<string>
  public abstract findById(userId: number): Promise<User | null>
}
