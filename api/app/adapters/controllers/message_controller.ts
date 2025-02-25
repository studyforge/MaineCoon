import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import MessageService from '../../domain/services/message_service.js'

@inject()
export default class MessageController {
  constructor(private messageService: MessageService) {}

  public async create({ request, response }: HttpContext): Promise<void> {
    try {
      const { content, senderId, conversationId } = request.only([
        'content',
        'senderId',
        'conversationId',
      ])
      const message = await this.messageService.createMessage(content, senderId, conversationId)
      return response.created({ message })
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }
}
