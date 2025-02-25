import ConversationRepository from '../../domain/repositories/conversation_repository.js'
import Conversation from '../models/conversation.js'

export default class PgConversationRepository implements ConversationRepository {
  public async create(name: string): Promise<void> {
    await Conversation.create({ name })
  }

  public async findById(id: string): Promise<Conversation | null> {
    return await Conversation.find(id)
  }
}
