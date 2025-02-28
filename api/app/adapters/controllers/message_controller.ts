import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import MessageService from '../../domain/services/message_service.js'

@inject()
export default class MessageController {
  constructor(private messageService: MessageService) {}

  public async create({ request, response }: HttpContext): Promise<void> {
    try {
      const { content, userId, conversationId } = request.only([
        'content',
        'userId',
        'conversationId',
      ])
      const message = await this.messageService.createMessage(content, userId, conversationId)
      return response.created({ message })
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  public async getMessagesByConversationId({ response, auth, params }: HttpContext): Promise<void> {
    try {
      const { conversationId } = params
      const userId: number = auth.user ? auth.user.id : 0
      const messages = await this.messageService.getMessagesByConversationId(conversationId, userId)
      return response.ok({ messages })
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }
}
