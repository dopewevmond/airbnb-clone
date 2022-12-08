import App from './app'
import AuthController from './controllers/controller.auth'
import ListingController from './controllers/controller.listing'
import UserController from './controllers/controller.user'

const app = new App([
  new AuthController(),
  new ListingController(),
  new UserController()
])

app.listen()
