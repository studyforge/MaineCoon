import { CreateUserDto } from '../../application/dtos/create_user_dto.js';
import User from '../../infrastructure/models/user.js'

export abstract class AuthRepository {
  public abstract create(user: User): Promise<User>
  public abstract findById(userId: number): Promise<User | null>
  
}
