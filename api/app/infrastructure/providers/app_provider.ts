import type { ApplicationService } from '@adonisjs/core/types'
import { UserRepository } from '../../domain/repositories/user_repository.js'
import { PgUserRepository } from '../repositories/pg_user_repository.js'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {}

  /**
   * The container bindings have booted
   */
  async boot() {
    this.app.container.bind(UserRepository, () => {
      return this.app.container.make(PgUserRepository)
    })
  }

  /**
   * The application has been booted
   */
  async start() {}

  /**
   * The process has been started
   */
  async ready() {}

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {}
}
