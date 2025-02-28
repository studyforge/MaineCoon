import { CreateMessageDto } from '../../application/dtos/message/create_message_dto.js'
import Message from '../../infrastructure/models/message.js'

export abstract class MessageRepository {
  public abstract createMessage(message: CreateMessageDto): Promise<void>
  public abstract getMessagesByConversationId(conversationId: number): Promise<Message[]>
}
