import {connect} from 'src/db'

const r = connect()

export default function changefeedForUserCreated() {
  return r.table('users')
  .getAll(USER_ROLES.MEMBER, {index: 'roles'})
  .changes()
  .filter(r.row('old_val').eq(null))
}