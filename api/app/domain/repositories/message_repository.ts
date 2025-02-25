import { CreateMessageDto } from '../../application/dtos/create_message_dto.js'

export abstract class MessageRepository {
  public abstract createMessage(message: CreateMessageDto): Promise<void>
}
