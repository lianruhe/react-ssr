import compose from 'koa-compose'

import koaBody from 'koa-body'
import logger from './logger'
// import error from './error'

export default compose([
  // error,
  koaBody(),
  logger
])
