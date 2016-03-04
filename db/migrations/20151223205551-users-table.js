/* eslint-disable no-var */

var config = require('../config')
var createOptions = config.createOptions

exports.up = function up(r, conn) {
  return r.tableCreate('users', createOptions)
    .run(conn)
    .then(() => {
      r.table('users').indexCreate('email').run(conn)
      return r.table('users').indexCreate('googleOAuth2Id', r.row('authProviders')('googleOAuth2')).run(conn)
    })
}

exports.down = function down(r, conn) {
  return r.tableDrop('users').run(conn)
}
