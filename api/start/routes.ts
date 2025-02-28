import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('../app/adapters/controllers/auth_controller.js')
const MessageController = () => import('../app/adapters/controllers/message_controller.js')
const ConversationController = () =>
  import('../app/adapters/controllers/conversation_controller.js')

router
  .group(() => {
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])
    router.post('/logout', [AuthController, 'logout']).use(middleware.auth())
  })
  .prefix('user')

router
  .group(() => {
    router.post('/create', [MessageController, 'create']).use(middleware.auth())
    router
      .get('/getByConversationId/:conversationId', [
        MessageController,
        'getMessagesByConversationId',
      ])
      .use(middleware.auth())
  })
  .prefix('message')

router
  .group(() => {
    router.post('/create', [ConversationController, 'create']).use(middleware.auth())
    router
      .post('/addUser', [ConversationController, 'addUserToConversation'])
      .use(middleware.auth())
  })
  .prefix('conversation')
