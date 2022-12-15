import App from './app'
import AuthController from './controllers/controller.auth'
import ListingController from './controllers/controller.listing'
import UserController from './controllers/controller.user'
import BookingController from './controllers/controller.booking'
import ReviewController from './controllers/controller.review'

const app = new App([
  new AuthController(),
  new ListingController(),
  new UserController(),
  new BookingController(),
  new ReviewController()
])

app.listen()
