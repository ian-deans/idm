/* eslint-disable no-console, camelcase */
import processChangeFeedWithAutoReconnect from 'rethinkdb-changefeed-reconnect'

import {changefeedForUserCreated} from 'src/server/services/dataService'
import {handleConnectionError} from './util'

export default function userCreated(userCreatedQueue) {
  processChangeFeedWithAutoReconnect(changefeedForUserCreated, _getFeedProcessor(userCreatedQueue), handleConnectionError, {
    changefeedName: 'user created'
  })
}

function _getFeedProcessor(userCreatedQueue) {
  return ({new_val: user}) => {
    const jobOpts = {
      attempts: 3,
      backoff: {type: 'fixed', delay: 60000},
    }
    userCreatedQueue.add(user, jobOpts)
  }
}
