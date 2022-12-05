import { Request, Response, NextFunction, Router } from 'express'
import { body, validationResult } from 'express-validator'
import AppDataSource from '../datasource'
import User from '../entities/entity.user'
import BadRequestException from '../exceptions/exception.badrequest'
import NotFoundException from '../exceptions/exception.notfound'
import tryCatchWrapper from '../utils/util.trycatchwrapper'
import Controller from './controller.interface'
import authenticateJWT from '../middleware/middleware.verifyjwt'

const userRepository = AppDataSource.getRepository(User)

class UserController implements Controller {
  public path = '/users'
  public router = Router()

  constructor () {
    this.setupRoutes()
  }

  private setupRoutes (): void {
    this.router.patch(
      `${this.path}/profile`,
      body('firstName')
        .optional()
        .isString().withMessage('first name is not a valid string')
        .isLength({ max: 50 }).withMessage('first name is longer than the maximum of 50 characters'),
      body('lastName')
        .optional()
        .isString().withMessage('last name is not a valid string')
        .isLength({ max: 50 }).withMessage('last name is longer than the maximum of 50 characters'),
      body('phoneNumber')
        .optional()
        .isNumeric().withMessage('phone number is not numeric')
        .isLength({ min: 12, max: 12 }).withMessage('phone number is not 12 characters in length. country code(3) and number (9)'),
      body('nativeLanguage')
        .optional()
        .isIn(['english', 'spanish', 'french']).withMessage('language must be either "english", "spanish" or "french"'),
      body('secondaryLanguage')
        .optional()
        .isIn(['english', 'spanish', 'french']).withMessage('language must be either "english", "spanish" or "french"'),
      body('bio')
        .optional()
        .isLength({ min: 255 }).withMessage('bio is longer than the maximum of 250 characters'),
      authenticateJWT,
      tryCatchWrapper(this.EditProfileHandler)
    )

    this.router.patch(
      `${this.path}/profile/nullify-fields`,
      body('phoneNumber')
        .optional()
        .isIn([true, 'true']).withMessage('phone number field should be set to true if present'),
      body('secondaryLanguage')
        .optional()
        .isIn([true, 'true']).withMessage('secondary language field should be set to true if present'),
      body('bio')
        .optional()
        .isIn([true, 'true']).withMessage('bio field should be set to true if present'),
      body('profilePhoto')
        .optional()
        .isIn([true, 'true']).withMessage('profile photo field should be set to true if present'),
      authenticateJWT,
      tryCatchWrapper(this.NullifyFieldHandler)
    )
  }

  private async EditProfileHandler (req: Request, res: Response, next: NextFunction): Promise<void> {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestException(errors.array()[0].msg))
    }
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
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(new BadRequestException(errors.array()[0].msg))
    }
    const { phoneNumber, secondaryLanguage, bio, profilePhoto } = req.body
    const emailOfUser = res.locals.user?.email as string
    if (emailOfUser == null) {
      return next(new BadRequestException('could not find email of user to edit profile'))
    }
    const userToEditProfile = await userRepository.findOne({ where: { email_address: emailOfUser } })
    if (userToEditProfile == null) {
      return next(new NotFoundException('user', 'email', emailOfUser))
    }
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
