import { inject } from '@adonisjs/core'
import { CreateMessageDto } from '../../application/dtos/message/create_message_dto.js'
import { MessageRepository } from '../repositories/message_repository.js'
import { GetMessageDto } from '../../application/dtos/message/get_message_dto.js'
import Message from '../../infrastructure/models/message.js'

@inject()
export default class MessageService {
  constructor(private messageRepository: MessageRepository) {}

  async createMessage(content: string, userId: number, conversationId: number): Promise<void> {
    const message: CreateMessageDto = {
      content: content,
      userId: userId,
      conversationId: conversationId,
    }
    await this.messageRepository.createMessage(message)
  }

  async getMessagesByConversationId(
    conversationId: number,
    userId: number
  ): Promise<GetMessageDto[]> {
    const messages: Message[] =
      await this.messageRepository.getMessagesByConversationId(conversationId)

    return messages.map((message) => {
      return {
        content: message.content,
        userId: message.userId,
        conversationId: message.conversationId,
        isMine: message.userId === userId,
        createdAt: message.createdAt,
        id: message.id,
      }
    })
  }
}
