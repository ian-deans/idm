/* eslint-disable no-console, camelcase */
import {updateUserHubspotEmail} from 'src/server/actions/updateUserHubspotEmail'

export function start() {
  const jobService = require('src/server/services/jobService')
  jobService.processJobs('userEmailChanged', processUserEmailChanged)
}

export async function processUserEmailChanged({new_val}) {
  const contactVid = new_val.hubspotId
  const newEmail = new_val.email

  await updateUserHubspotEmail(contactVid, newEmail)
}
