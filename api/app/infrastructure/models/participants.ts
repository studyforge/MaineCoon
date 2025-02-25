import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Conversation from './conversation.js'
import User from './user.js'

export default class Participant extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @hasMany(() => Conversation)
  declare conversation: HasMany<typeof Conversation>

  @hasMany(() => User)
  declare user: HasMany<typeof User>
}
