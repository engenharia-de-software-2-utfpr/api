'use strict'

const Firebase = use('Adonis/Services/Firebase')
const User = use('App/Models/User')

class UserController {
    async signup({ request, response }) {
        try {

            const { token } = request.all()

            const decodedToken = await Firebase.decodeToken(token)
            const userId = decodedToken["user_id"]

            let user = await User.find(userId)
            if (!user) {
                user = await User.create({ id: userId, name: decodedToken["name"] })
            }

            return { success: true, message: "user returned", data: user }

        } catch (error) {
            response.unauthorized({ success: false, message: "error decoding token", data: null })

        }

    }
}

module.exports = UserController
