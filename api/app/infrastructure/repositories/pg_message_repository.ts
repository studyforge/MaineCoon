import { CreateMessageDto } from '../../application/dtos/message/create_message_dto.js'
import { MessageRepository } from '../../domain/repositories/message_repository.js'
import Message from '../models/message.js'

export class PgMessageRepository implements MessageRepository {
  public async createMessage(message: CreateMessageDto): Promise<void> {
    await Message.create(message)
  }

  public async getMessagesByConversationId(conversationId: number): Promise<Message[]> {
    return await Message.query().where('conversationId', conversationId)
  }
}
