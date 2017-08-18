import userCreated from './userCreated'

export default function configureChangeFeeds() {
  const queueService = require('src/server/services/queueService')

  try {
    userCreated(queueService.getQueue('userCreated'))
  } catch (err) {
    console.error(`ERROR Configuring Change Feeds: ${err.stack ? err.stack : err}`)
    throw (err)
  }
}
