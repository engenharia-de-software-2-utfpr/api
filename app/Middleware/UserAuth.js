'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Firebase = use('Adonis/Services/Firebase')
const User = use('App/Models/User')


class UserAuth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response }, next) {

    try {

      const token = request.header('Authorization')

      const decodedToken = await Firebase.decodeToken(token)
      const userId = decodedToken["user_id"]

      let user = await User.find(userId)
      if (user) {
        request.user = user
        await next()
      } else {
        response.unauthorized({ success: false, message: 'unauthorized', data: null })
      }
    } catch (error) {
      console.log('aque', error)
      response.unauthorized({ success: false, message: 'unauthorized', data: null })

    }


  }
}

module.exports = UserAuth
