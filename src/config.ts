import dotenv from 'dotenv'

dotenv.config()

export const config = {
  authToken: process.env.AUTH_TOKEN || '',
  port: process.env.PORT || '8080',
  host: process.env.HOST || '127.0.0.1',
}
