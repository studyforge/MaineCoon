import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Message from './message.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Conversation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @hasMany(() => Message)
  declare message: HasMany<typeof Message>

  @manyToMany(() => User, {
    pivotTable: 'participants',
  })
  declare user: ManyToMany<typeof User>
}
