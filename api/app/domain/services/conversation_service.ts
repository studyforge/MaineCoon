import { inject } from '@adonisjs/core'
import { ConversationDto } from '../../application/dtos/conversation_dto.js'
import ConversationRepository from '../repositories/conversation_repository.js'

@inject()
export default class ConversationService {
  constructor(private conversationRepository: ConversationRepository) {}

  public async createConversation(title: string): Promise<void> {
    await this.conversationRepository.create(title)
  }

  public async getConversation(id: string): Promise<ConversationDto | null> {
    const conversation = await this.conversationRepository.findById(id)
    return conversation ? conversation : null
  }

  public async addUserToConversation(userId: number, conversationId: number): Promise<void> {
    await this.conversationRepository.addUserToConversation(userId, conversationId)
  }
}
