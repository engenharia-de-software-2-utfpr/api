'use strict'

class AdminController {
    async signin({ request, auth }) {
        const { email, password } = request.all()

        const token = await auth.attempt(email, password)
        return { success: true, message: 'authenticated', data: token }
    }
}

module.exports = AdminController
