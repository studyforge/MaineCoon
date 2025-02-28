import { DateTime } from 'luxon'

export type GetMessageDto = {
  id: number
  content: string
  createdAt: DateTime
  isMine: boolean
  userId: number
  conversationId: number
}
