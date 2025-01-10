import router from '@adonisjs/core/services/router'
const UserController = () => import('../app/adapters/http/controllers/user_controller.js')

router
  .group(() => {
    router.post('register', [UserController, 'create'])
  })
  .prefix('user')
