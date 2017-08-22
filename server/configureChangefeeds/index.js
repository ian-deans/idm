import userCreated from './userCreated'
import userEmailChanged from './userEmailChanged'

export default function configureChangeFeeds() {
  const queueService = require('src/server/services/queueService')

  try {
    userCreated(queueService.getQueue('userCreated'))
    userEmailChanged(queueService.getQueue('userEmailChanged'))
  } catch (err) {
    console.error(`ERROR Configuring Change Feeds: ${err.stack ? err.stack : err}`)
    throw (err)
  }
}
