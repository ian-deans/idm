import {updateContactByVID} from 'src/server/services/crmService'

export async function updateUserHubspotEmail(contactVid, email) {
  const properties = [{property: 'email', value: email}]

  try {
    await updateContactByVID(contactVid, {properties})
  } catch (error) {
    throw new Error(error.message ? error.message : 'Failed to updated HubSpot contact email.')
  }
}
