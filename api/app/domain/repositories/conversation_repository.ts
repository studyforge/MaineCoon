import Conversation from '../../infrastructure/models/conversation.js'

export default abstract class ConversationRepository {
  public abstract create(name: string): Promise<void>
  public abstract findById(id: number): Promise<Conversation | null>
  public abstract addUserToConversation(userId: number, conversation: Conversation): Promise<void>
}
