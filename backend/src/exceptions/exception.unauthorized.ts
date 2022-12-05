import HttpException from './exception.http'

class UnauthorizedException extends HttpException {
  constructor () {
    super(403, 'You are not authorized to perform this action')
  }
}

export default UnauthorizedException
