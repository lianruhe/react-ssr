import mongoose, { Schema } from 'mongoose'

mongoose.Promise = global.Promise
const db = mongoose.createConnection('mongodb://admin:1234567@localhost/koa-server', {
  useMongoClient: true
})
db.on('error', console.error.bind(console, 'Mongodb connection error:'))
db.once('open', console.log.bind(console, 'Mongodb connection success!!!'))

/**
 * 登陆用户的模型
 * Account Model
 */
const userSchema = new Schema({ username: String, password: String })
export const AccountModel = db.model('Account', userSchema, 'account')

export default db
