import Conversation from '../../infrastructure/models/conversation.js'

export default abstract class ConversationRepository {
  public abstract create(name: string): Promise<void>
  public abstract findById(id: string): Promise<Conversation | null>
}
