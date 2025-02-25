import { inject } from '@adonisjs/core'
import { CreateMessageDto } from '../../application/dtos/create_message_dto.js'
import { MessageRepository } from '../repositories/message_repository.js'

@inject()
export default class MessageService {
  constructor(private messageRepository: MessageRepository) {}

  async createMessage(
    content: string,
    senderId: string,
    conversationId: string
  ): Promise<CreateMessageDto> {
    const message: CreateMessageDto = {
      content: content,
      senderId: senderId,
      conversationId: conversationId,
    }
    const createdMessage = await this.messageRepository.createMessage(message)
    return createdMessage
  }
}
