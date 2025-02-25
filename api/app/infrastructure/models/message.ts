import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

import Conversation from './conversation.js'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare content: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare senderId: string

  @column()
  declare conversationId: string

  @hasOne(() => Conversation)
  declare conversation: HasOne<typeof Conversation>
}
