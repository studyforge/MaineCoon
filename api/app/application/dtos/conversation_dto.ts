import { DateTime } from 'luxon'

export type ConversationDto = {
  id: number
  name: string
  createdAt: DateTime
}
