import HttpException from './exception.http'

class UserExistsException extends HttpException {
  constructor (email: string) {
    super(400, `A user already exists with email ${email}`)
  }
}

export default UserExistsException
