import { inject } from "@adonisjs/core";
import { Logger } from "@adonisjs/core/logger";
import User from "../../infrastructure/models/user";
import { AuthRepository } from "../repositories/auth_repository";
import { CreateUserDto } from "../../application/dtos/create_user_dto";

@inject()
export default class AuthService {
  constructor(private logger: Logger,
    private authRepository: AuthRepository
  ) {}

  public async register(userData : CreateUserDto): Promise<CreateUserDto> {
    this.logger.info(`Registering user: ${userData.email}`)
    const user = await this.authRepository.create(userData as User)
    this.logger.info(`User ${user.id} created`)
    return user as CreateUserDto
  }

  public async login(email: string, password: string) {
    this.logger.info(`User ${email} is attempting to log in`)
    // Login logic here
  }
}
