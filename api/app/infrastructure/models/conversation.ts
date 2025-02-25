import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import User from './user.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Conversation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @hasMany(() => User, {})
  declare user: HasMany<typeof User>
}
