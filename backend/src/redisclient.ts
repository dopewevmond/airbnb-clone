import * as redis from 'redis'

const redisClient: redis.RedisClientType = redis.createClient({
  url: process.env.REDIS_URI
})
;(async () => {
  redisClient.on('error', (error) => {
    console.error(error)
    process.exit()
  })
  await redisClient.connect()
})()
  .then(() => console.log('connected to redis'))
  .catch(() => {
    console.log('error while connecting to redis')
    return process.exit()
  })

export default redisClient
