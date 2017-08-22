// start workers
require('./userCreated').start()
require('./userEmailChanged').start()

// start change feed listeners
require('src/server/configureChangeFeeds')()
