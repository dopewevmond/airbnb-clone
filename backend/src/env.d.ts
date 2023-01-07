declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      SECRET: string
      REFRESH_SECRET: string
      REDIS_URI: string
      SENTRY_DSN: string
      CLOUDINARY_CLOUD_NAME: string
      CLOUDINARY_API_KEY: string
      CLOUDINARY_API_SECRET: string
      POSTGRES_URI: string
    }
  }
}

export {}
