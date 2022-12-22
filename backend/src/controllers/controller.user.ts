import { Request, Response, NextFunction, Router } from 'express'
import AppDataSource from '../datasource'
import User from '../entities/entity.user'
import BadRequestException from '../exceptions/exception.badrequest'
import NotFoundException from '../exceptions/exception.notfound'
import tryCatchWrapper from '../utils/util.trycatchwrapper'
import Controller from './controller.interface'
import authenticateJWT from '../middleware/middleware.verifyjwt'
import validateInputs from '../middleware/middleware.validate'
import { IdSchema } from '../schema/schema.listing'
import { EditProfileSchema, OptionalProfileSchema } from '../schema/schema.user'

const userRepository = AppDataSource.getRepository(User)

class UserController implements Controller {
  public path = '/users'
  public router = Router()

  constructor () {
    this.setupRoutes()
  }

  private setupRoutes (): void {
    this.router.get(`${this.path}/profile/:id`, authenticateJWT, validateInputs(IdSchema), tryCatchWrapper(this.GetProfileInfoHandler))
    this.router.patch(`${this.path}/profile`, authenticateJWT, validateInputs(EditProfileSchema), tryCatchWrapper(this.EditProfileHandler))
    this.router.patch(`${this.path}/profile/nullify-fields`, authenticateJWT, validateInputs(OptionalProfileSchema), tryCatchWrapper(this.NullifyFieldHandler)
    )
  }

  private async GetProfileInfoHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const fullUserDetails = await userRepository.findOneOrFail({
      where: { id: parseInt(id) },
      select: ['id', 'first_name', 'last_name', 'email_address', 'bio', 'created_at', 'phone_number', 'created_at', 'native_language', 'secondary_language', 'is_super_host', 'has_verified_email', 'profile_photo']
    })
    if (fullUserDetails.email_address === res.locals.user?.email) {
      res.json({ user: fullUserDetails })
    } else {
      const user = await userRepository.findOneOrFail({
        where: { id: parseInt(id) },
        select: ['first_name', 'created_at', 'native_language', 'secondary_language', 'bio', 'profile_photo', 'is_super_host']
      })
      res.json({ user })
    }
  }

  private async EditProfileHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { firstName, lastName, phoneNumber, nativeLanguage, secondaryLanguage, bio } = req.body
    const emailOfUserToEditProfile = res.locals.user?.email as string
    if (emailOfUserToEditProfile == null) {
      return next(new BadRequestException('could not find email of user to edit'))
    }
    const userToEditProfile = await userRepository.findOne({ where: { email_address: emailOfUserToEditProfile } })
    if (userToEditProfile == null) {
      return next(new NotFoundException('user', 'email', emailOfUserToEditProfile))
    }
    userToEditProfile.first_name = firstName
    userToEditProfile.last_name = lastName
    userToEditProfile.phone_number = phoneNumber
    userToEditProfile.native_language = nativeLanguage
    userToEditProfile.secondary_language = secondaryLanguage
    userToEditProfile.bio = bio
    await userRepository.save(userToEditProfile)
    res.json({ message: 'Updated profile successfully' })
  }

  private async NullifyFieldHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { phoneNumber, secondaryLanguage, bio, profilePhoto } = req.body
    const emailOfUser = res.locals.user?.email as string
    if (emailOfUser == null) {
      return next(new BadRequestException('could not find email of user to edit profile'))
    }
    const userToEditProfile = await userRepository.findOneOrFail({ where: { email_address: emailOfUser } })
    if (phoneNumber != null) {
      userToEditProfile.phone_number = null
    }
    if (secondaryLanguage != null) {
      userToEditProfile.secondary_language = null
    }
    if (bio != null) {
      userToEditProfile.bio = null
    }
    if (profilePhoto != null) {
      // when the upload image api is added the image should be deleted from the cloud too
      userToEditProfile.profile_photo = null
    }
    await userRepository.save(userToEditProfile)
    res.json({ message: 'Updated profile successfully' })
  }
}

export default UserController
