import { CreateMessageDto } from '../../application/dtos/create_message_dto.js'
import { MessageRepository } from '../../domain/repositories/message_repository.js'
import Message from '../models/message.js'

export class PgMessageRepository implements MessageRepository {
  public async createMessage(message: CreateMessageDto): Promise<void> {
    await Message.create(message)
  }
}
