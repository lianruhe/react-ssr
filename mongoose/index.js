import mongoose, { Schema } from 'mongoose'

const debug = require('debug')('server:mongodb')

mongoose.Promise = global.Promise
const db = mongoose.createConnection('mongodb://admin:1234567@localhost/koa-server', {
  useMongoClient: true
})
db.on('error', () => debug('Mongodb connection error: ' + JSON.stringify(arguments)))
// db.once('open', console.log.bind(console, 'Mongodb connection success!!!'))
db.once('open', () => debug('Mongodb connection success!!!'))

/**
 * 登陆用户的模型
 * Account Model
 */
const userSchema = new Schema({ username: String, password: String })
export const AccountModel = db.model('Account', userSchema, 'account')

export default db
