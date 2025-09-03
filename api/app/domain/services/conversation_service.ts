import { inject } from '@adonisjs/core'
import { ConversationDto } from '../../application/dtos/conversation_dto.js'
import ConversationRepository from '../repositories/conversation_repository.js'
import { UserRepository } from '../repositories/auth_repository.js'

@inject()
export default class ConversationService {
  constructor(
    private conversationRepository: ConversationRepository,
    private userRepository: UserRepository
  ) {}

  public async createConversation(title: string): Promise<void> {
    await this.conversationRepository.create(title)
  }

  public async getConversation(id: number): Promise<ConversationDto | null> {
    const conversation = await this.conversationRepository.findById(id)
    return conversation ? conversation : null
  }

  public async addUserToConversation(userId: number, conversationId: number): Promise<void> {
    const user = await this.userRepository.findById(userId)
    const conversation = await this.conversationRepository.findById(conversationId)
    if (!user || !conversation) {
      throw new Error('User or conversation not found')
    }
    await this.conversationRepository.addUserToConversation(userId, conversation)
  }
}
