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
  async handle({ request, response, auth }, next) {

    try {

      const token = request.headers()['authorization'].split(' ')[1]
      const { uid } = await auth._verifyToken(token)

      const user = await User.find(uid)
      // Por algum motivo o getUser não funciona e eu to cansado
      // const user = await auth.getUser()
      if (user) {
        request.user = user
        await next()
      } else {
        response.unauthorized({ success: false, message: 'unauthorized', data: null })
      }
    } catch (error) {
      console.log(error)
      response.unauthorized({ success: false, message: 'unauthorized', data: null })

    }


  }
}

module.exports = UserAuth
