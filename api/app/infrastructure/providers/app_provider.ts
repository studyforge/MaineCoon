import type { ApplicationService } from '@adonisjs/core/types'
import { UserRepository } from '../../domain/repositories/user_repository.js'
import { PgUserRepository } from '../repositories/pg_user_repository.js'
import { MessageRepository } from '../../domain/repositories/message_repository.js'
import { PgMessageRepository } from '../repositories/pg_message_repository.js'
import { BaseEvent } from '@adonisjs/core/events'
import ConversationRepository from '../../domain/repositories/conversation_repository.js'
import PgConversationRepository from '../repositories/pg_conversation_repository.js'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  protected async makeEventsDispatchable() {
    BaseEvent.useEmitter(await this.app.container.make('emitter'))
  }

  /**
   * Register bindings to the container
   */
  register() {}

  /**
   * The container bindings have booted
   */
  async boot() {
    await this.makeEventsDispatchable()

    this.app.container.bind(UserRepository, () => new PgUserRepository())
    this.app.container.bind(MessageRepository, () => new PgMessageRepository())
    this.app.container.bind(ConversationRepository, () => new PgConversationRepository())
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
