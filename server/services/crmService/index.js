import fetch from 'isomorphic-fetch'

import config from 'src/config'

const paths = {
  contactProfileByEmail: email => `/contacts/v1/contact/email/${email}/profile`,
  contactProfileByVID: vid => `/contacts/v1/contact/vid/${vid}/profile`,
}

/**
 * NOTE: this service's functions are exported the way they are to enable
 * certain stubbing functionality functionality for testing that relies on the
 * way the module is cached and later required by dependent modules.
 */
export default {
  getContactByEmail,
  updateContactByVID,
}

async function updateContactByVID(vid, properties) {
  const url = _crmURL(paths.contactProfileByVID(vid))

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(properties)
  })

  if (!resp.ok) {
    throw new Error(`Couldn't update contact: ${resp.statusText}`)
  }

  // API returns statusCode 204 with no body
  return true
}

async function getContactByEmail(email) {
  const url = _crmURL(paths.contactProfileByEmail(encodeURIComponent(email)))

  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    }
  })

  if (!resp.ok) {
    throw new Error(`Couldn't get contact by email: ${resp.statusText}`)
  }

  return resp.json()
}

function _crmURL(path) {
  _assertEnvironment()
  return `${config.server.crm.baseURL}${path}?hapikey=${config.server.crm.key}`
}

function _assertEnvironment() {
  if (!config.server.crm.baseURL) {
    throw new Error('CRM base URL must be configured')
  }
  if (!config.server.crm.key) {
    throw new Error('CRM API key must be configured')
  }
}
