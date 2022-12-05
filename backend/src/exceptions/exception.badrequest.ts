import HttpException from './exception.http'

class BadRequestException extends HttpException {
  constructor (message: string) {
    super(400, message[0].toUpperCase() + message.slice(1))
  }
}

export default BadRequestException
