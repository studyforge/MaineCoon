import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const UsersController = () => import('../app/adapters/controllers/users_controller.js')
const AuthController = () => import('../app/adapters/controllers/auth_controller.js')

router
  .group(() => {
    router.get('/me', [UsersController, 'me']).use(middleware.auth())
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])
    router
      .post('/logout', [AuthController, 'logout'])
      .use(middleware.auth())
  })
  .prefix('user')