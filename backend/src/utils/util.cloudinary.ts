import { v2 } from 'cloudinary'
import HttpException from '../exceptions/exception.http'

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

v2.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
})

/**
 * Uploads an image to cloudinary
 * @param imageBuffer A buffer of the image to upload
 * @returns An UploadApiResponse type which has properties `secure_url` and `public_id` which can
 * be used to access the image and delete an image by its id respectively
 */
// eslint-disable-next-line @typescript-eslint/promise-function-async
export function uploadImage (imageBuffer: ArrayBuffer): Promise<unknown> {
  return new Promise((resolve, reject) => {
    v2.uploader.upload_stream((err, image) => {
      if (err != null) {
        reject(err)
      } else {
        resolve(image)
      }
    }).end(imageBuffer)
  })
}

/**
 * Deletes an image from cloudinary. Returns status code of 200 even when image is not found
 *
 * Body of response - { result: 'ok' | 'not found' }
 * @param publicImageId the public Id of the image you want to delete
 */
export function deleteImage (publicImageId: string): any {
  v2.uploader.destroy(publicImageId, {
    resource_type: 'image',
    type: 'upload',
    invalidate: true
  })
    .then((value) => {
      return value
    })
    .catch((err) => {
      return new HttpException(500, err)
    })
}
