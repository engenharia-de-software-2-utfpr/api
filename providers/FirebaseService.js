

class FirebaseService {

  constructor(Config) {
    const Env = use('Env')

    let decoded = Buffer.from(Env.get('FIREBASE_CONFIG'), 'base64').toString()
    decoded = JSON.parse(decoded)

    const admin = require('firebase-admin')

    admin.initializeApp({
      credential: admin.credential.cert(decoded),
      storageBucket: Env.get('BUCKET_NAME')
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

  async generateUrl(fileName) {
    const storage = this.admin.storage().bucket()

    const today = new Date()
    const nextWeek = new Date()
    nextWeek.setDate(today.getDate() + 7)

    const file = storage.file(fileName)
    const url = await file.getSignedUrl({ action: 'write', expires: nextWeek })

    return url[0]
  }
}

module.exports = FirebaseService

