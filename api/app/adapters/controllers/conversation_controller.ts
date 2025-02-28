import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import ConversationService from '../../domain/services/conversation_service.js'

@inject()
export default class ConversationController {
  constructor(private conversationService: ConversationService) {}

  public async create({ request, response }: HttpContext): Promise<void> {
    try {
      const { name } = request.only(['name'])
      const conversation = await this.conversationService.createConversation(name)
      return response.created({ conversation })
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  public async show({ params, response }: HttpContext): Promise<void> {
    try {
      const conversation = await this.conversationService.getConversation(params.id)
      return response.ok({ conversation })
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  public async addUserToConversation({ request, response }: HttpContext): Promise<void> {
    try {
      const { userId, conversationId } = request.only(['userId', 'conversationId'])
      await this.conversationService.addUserToConversation(userId, conversationId)
      return response.created()
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }
}
