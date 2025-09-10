import { inject } from "@adonisjs/core";
import { Logger } from "@adonisjs/core/logger";
import User from "../../infrastructure/models/user.js";
import { CreateUserDto } from "../../application/dtos/create_user_dto.js";
import { AuthRepository } from "../repositories/auth_repository.js";
import { AccessToken } from "@adonisjs/auth/access_tokens";

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

  public async login(email: string, password: string): Promise<{ user: User; token: AccessToken }> {
    this.logger.info(`User ${email} is attempting to log in`)
    const { user, token } = await this.authRepository.login(email, password)
    this.logger.info(`User ${user.id} logged in`)
    return { user, token }
  }

  public async logout(user: User, token: string | number | BigInt): Promise<void> {
    this.logger.info(`User ${user.id} is logging out`)
    await this.authRepository.logout(user, token)
    this.logger.info(`User ${user.id} logged out`)
  }
}
