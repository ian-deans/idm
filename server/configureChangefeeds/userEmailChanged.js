/* eslint-disable no-console, camelcase */
import processChangeFeedWithAutoReconnect from 'rethinkdb-changefeed-reconnect'

import {changefeedForUserEmailChanged} from 'src/server/services/dataService'
import {handleConnectionError} from './util'

export default function userEmailChanged(userEmailChangedQueue) {
  processChangeFeedWithAutoReconnect(
    changefeedForUserEmailChanged, _getFeedProcessor(userEmailChangedQueue), handleConnectionError,
    {changefeedName: 'user email changed'}
  )
}

function _getFeedProcessor(userEmailChangedQueue) {
  return ({old_val, new_val}) => {
    const jobOpts = {
      attempts: 3,
      backoff: {type: 'fixed', delay: 60000},
    }
    userEmailChangedQueue.add({old_val, new_val}, jobOpts)
  }
}
