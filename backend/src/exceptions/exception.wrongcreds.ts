import HttpException from './exception.http'

class WrongCredentialsException extends HttpException {
  constructor () {
    super(401, 'Wrong username or password')
  }
}

export default WrongCredentialsException
