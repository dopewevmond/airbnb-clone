import HttpException from './exception.http'

class NoAccessTokenException extends HttpException {
  constructor () {
    super(401, 'Bearer access token not found in request header')
  }
}

export default NoAccessTokenException
