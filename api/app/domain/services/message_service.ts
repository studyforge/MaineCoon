import { inject } from '@adonisjs/core'
import { CreateMessageDto } from '../../application/dtos/create_message_dto.js'
import { MessageRepository } from '../repositories/message_repository.js'

@inject()
export default class MessageService {
  constructor(private messageRepository: MessageRepository) {}

  async createMessage(content: string, senderId: string, conversationId: string): Promise<void> {
    const message: CreateMessageDto = {
      content: content,
      senderId: senderId,
      conversationId: conversationId,
    }
    await this.messageRepository.createMessage(message)
  }
}
