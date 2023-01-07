import { Request, Response, NextFunction, Router } from 'express'
import BadRequestException from '../exceptions/exception.badrequest'
import NotFoundException from '../exceptions/exception.notfound'
import tryCatchWrapper from '../utils/util.trycatchwrapper'
import Controller from './controller.interface'
import authenticateJWT from '../middleware/middleware.verifyjwt'
import validateInputs from '../middleware/middleware.validate'
import { IdSchema } from '../schema/schema.listing'
import { EditProfileSchema, OptionalProfileSchema } from '../schema/schema.user'

import { userRepository } from '../utils/util.repositories'

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
    const fullUserDetails = await userRepository.findOne({
      where: { id: parseInt(id) },
      select: ['id', 'first_name', 'last_name', 'email_address', 'bio', 'created_at', 'phone_number', 'created_at', 'native_language', 'secondary_language', 'is_super_host', 'has_verified_email', 'profile_photo']
    })
    if (fullUserDetails == null) return next(new NotFoundException('user', 'id', id))
    if (fullUserDetails.id === res.locals.user?.id) {
      res.json({ user: fullUserDetails })
    } else {
      const user = await userRepository.findOne({
        where: { id: parseInt(id) },
        select: ['first_name', 'created_at', 'native_language', 'secondary_language', 'bio', 'profile_photo', 'is_super_host']
      })
      if (user == null) return next(new NotFoundException('user', 'id', id))
      res.json({ user })
    }
  }

  private async EditProfileHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { firstName, lastName, phoneNumber, nativeLanguage, secondaryLanguage, bio } = req.body
    const idOfUserToEdit = res.locals.user?.id as string
    const userToEditProfile = await userRepository.findOne({
      where: { id: Number(idOfUserToEdit) },
      select: ['id', 'first_name', 'last_name', 'email_address', 'bio', 'created_at', 'phone_number', 'created_at', 'native_language', 'secondary_language', 'is_super_host', 'has_verified_email', 'profile_photo']
    })
    if (userToEditProfile == null) {
      return next(new BadRequestException('the user profile you\'re trying to edit does not exist'))
    }
    userToEditProfile.first_name = firstName
    userToEditProfile.last_name = lastName
    userToEditProfile.phone_number = phoneNumber
    userToEditProfile.native_language = nativeLanguage
    userToEditProfile.secondary_language = secondaryLanguage
    userToEditProfile.bio = bio
    await userRepository.save(userToEditProfile)
    res.json({ message: 'Updated profile successfully', user: userToEditProfile })
  }

  private async NullifyFieldHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { phoneNumber, secondaryLanguage, bio, profilePhoto } = req.body
    const idOfUser = res.locals.user?.id as string
    if (idOfUser == null) {
      return next(new BadRequestException('could not find id of user to edit profile'))
    }
    const userToEditProfile = await userRepository.findOneOrFail({ where: { id: Number(idOfUser) } })
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
