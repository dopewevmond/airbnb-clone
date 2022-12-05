import App from './app'
import AuthController from './controllers/controller.auth'
import AccomController from './controllers/controller.accomodation'

const app = new App([
  new AuthController(),
  new AccomController()
])

app.listen()
