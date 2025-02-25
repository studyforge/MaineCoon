import { CreateMessageDto } from '../../application/dtos/create_message_dto.js'
import Message from '../../infrastructure/models/message.js'

export abstract class MessageRepository {
  public abstract createMessage(message: CreateMessageDto): Promise<Message>
}
