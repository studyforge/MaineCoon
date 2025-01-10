const UsersController = () => import('#controllers/users_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/register', [UsersController, 'create'])
  })
  .prefix('user')
