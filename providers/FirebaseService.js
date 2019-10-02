

class FirebaseService {

  constructor(Config) {
    const Env = use('Env')

    let decoded = Buffer.from(Env.get('FIREBASE_CONFIG'), 'base64').toString()
    decoded = JSON.parse(decoded)

    const admin = require('firebase-admin')

    admin.initializeApp({
      credential: admin.credential.cert(decoded)
    })

    this.admin = admin
  }

  async decodeToken(token) {
    try {
      return await this.admin.auth().verifyIdToken(token)
    } catch (error) {
      return null
    }
  }
}

module.exports = FirebaseService

