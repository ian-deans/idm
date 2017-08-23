import test from 'ava'
import * as userCreated from '../userCreated'

test('syncs newly created user with CRM and sends user data to echo.', t => {
  t.true(userCreated.hasOwnProperty('start'), 'No start function found in userCreated worker.')
  t.true(userCreated.hasOwnProperty('processUserCreated'), 'No process function found in userCreated worker.')
})
