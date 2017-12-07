import db from '../index'
import { Schema } from 'mongoose'
/**
 * 登陆用户的模型
 * User Model
 */
const userSchema = new Schema({ username: String, password: String })
export default db.model('Account', userSchema, 'account')
