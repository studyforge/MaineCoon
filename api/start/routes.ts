import router from '@adonisjs/core/services/router'
const UsersController = () => import('../app/adapters/controllers/users_controller.js')

router
  .group(() => {
    router.post('/register', [UsersController, 'create'])
    router.post('/login', [UsersController, 'login'])
  })
  .prefix('user')
