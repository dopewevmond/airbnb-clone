import App from './app'
import AuthController from './controllers/controller.auth'
import AccomController from './controllers/controller.accomodation'
import UserController from './controllers/controller.user'

const app = new App([
  new AuthController(),
  new AccomController(),
  new UserController()
])

app.listen()
