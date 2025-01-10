import type { ApplicationService } from '@adonisjs/core/types'
import { IUserRepository } from '../app/domain/interfaces/user_repository.js'
import { UserRepository } from '../app/adapters/database/pg_user_repository.js'
import { BaseEvent } from '@adonisjs/core/events'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  protected async makeEventsDispatchable() {
    BaseEvent.useEmitter(await this.app.container.make('emitter'))
  }

  /**
   * The container bindings have booted
   */
  async boot() {
    await this.makeEventsDispatchable()

    this.app.container.bind(IUserRepository, () => new UserRepository())
  }
}
