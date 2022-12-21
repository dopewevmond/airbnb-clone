import * as redis from 'redis'

let redisClient: redis.RedisClientType
;(async () => {
  redisClient = redis.createClient()
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

function SingletonRedisClient (): Function {
  const singletonRedisClient = redisClient
  return function (): redis.RedisClientType {
    return singletonRedisClient
  }
}

const singletonRedisClient = SingletonRedisClient()

export default singletonRedisClient
