import test from 'ava'
import * as userEmailChanged from '../userEmailChanged'

test('updates users email in HubSpot when changed in IDM.', t => {
  t.true(userEmailChanged.hasOwnProperty('start'), 'No start function found in userEmailChanged worker.')
  t.true(userEmailChanged.hasOwnProperty('processUserEmailChanged'), 'No process function found in userEmailChanged worker.')
})
