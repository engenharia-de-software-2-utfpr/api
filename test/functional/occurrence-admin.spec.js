'use strict'

const { test, trait } = use('Test/Suite')('OccurrenceAdmin')

const jwt = require('jsonwebtoken')
const { ioc } = use('@adonisjs/fold')


const Admin = use('App/Models/Admin')
const User = use('App/Models/User')
const Resource = use('App/Models/Resource')
const Occurrence = use('App/Models/Occurrence')
const OccurrenceCategory = use('App/Models/OccurrenceCategory')

trait('Test/ApiClient')
trait('Auth/Client')
trait('DatabaseTransactions')

const firebaseFake = () => {
  return {
    async decodeToken(token) {
      try {
        return jwt.verify(token, 'poi')
      } catch (error) {
        return null
      }
    },
    async generateUrl(fileName) {
      return 'www.url.com'
    }
  }
}



// // test('não altera status de uma ocorrência se o token não foi passado', async ({ assert, client }) => {

// //   const userInfo = {
// //     "user_id": "1234",
// //     "name": "Foo"
// //   }
// //   const firebaseToken = jwt.sign(userInfo, 'poi')
// //   ioc.fake('Adonis/Services/Firebase', firebaseFake)
// //   let response = await client.post('user/signup').send({ token: firebaseToken }).end()

// //   const token = 'Bearer ' + response.body.data.token

// //   await OccurrenceCategory.create({ id: 'fire', description: 'Queimadas' })

// //   let payload = {
// //     coordinates: {
// //       latitude: '123',
// //       longitude: '456'
// //     },
// //     category_id: 'fire',
// //     num_photos: 1,
// //     num_videos: 1,
// //     num_audios: 1,
// //     name: 'nome',
// //     description: 'ola',
// //     criticity_level: 3
// //   }


// //   response = await client.post('occurrence').header('Authorization', token).send(payload).end()
// //   ioc.restore('Adonis/Services/Firebase')

// //   let occurrenceObj = await Occurrence.find(response.body.data.id)
// //   assert.strictEqual(occurrenceObj.status, "waiting")

// //   const res = await client.put('occurrence-admin/' + occurrenceObj.id + '/status').send({ status: 'approved' }).end()
// //   res.assertStatus(401)

// //   occurrenceObj = await Occurrence.find(response.body.data.id)
// //   assert.strictEqual(occurrenceObj.status, "waiting")

// //   await client.put('occurrence-admin/' + occurrenceObj.id + '/status').send({ status: 'resolved' }).end()

// //   occurrenceObj = await Occurrence.find(response.body.data.id)
// //   assert.strictEqual(occurrenceObj.status, "waiting")
// // })

// // test('altera status de uma ocorrência', async ({ assert, client }) => {
// //   const userInfo = {
// //     "user_id": "1234",
// //     "name": "Foo"
// //   }
// //   const firebaseToken = jwt.sign(userInfo, 'poi')
// //   ioc.fake('Adonis/Services/Firebase', firebaseFake)
// //   let response = await client.post('user/signup').send({ token: firebaseToken }).end()
// //   ioc.restore('Adonis/Services/Firebase')

// //   const token = 'Bearer ' + response.body.data.token

// //   const admin = await Admin.create({ id: 1, name: "Admin", email: "admin@admin.com", password: "1234" })

// //   await OccurrenceCategory.create({ id: 'fire', description: 'Queimadas' })

// //   let payload = {
// //     coordinates: {
// //       latitude: '123',
// //       longitude: '456'
// //     },
// //     category_id: 'fire',
// //     num_photos: 1,
// //     num_videos: 1,
// //     num_audios: 1,
// //     name: 'nome',
// //     description: 'ola',
// //     criticity_level: 3
// //   }

// //   response = await client.post('occurrence').header('Authorization', token).send(payload).end()

// //   let occurrenceObj = await Occurrence.find(response.body.data.id)
// //   assert.strictEqual(occurrenceObj.status, "waiting")

// //   await client.put('occurrence-admin/' + occurrenceObj.id + '/status').send({ status: 'approved' }).loginVia(admin, 'jwt').end()

// //   occurrenceObj = await Occurrence.find(response.body.data.id)
// //   assert.strictEqual(occurrenceObj.status, "approved")

// //   await client.put('occurrence-admin/' + occurrenceObj.id + '/status').send({ status: 'resolved' }).loginVia(admin, 'jwt').end()

// //   occurrenceObj = await Occurrence.find(response.body.data.id)
// //   assert.strictEqual(occurrenceObj.status, "resolved")
// // })



test('lista todas as ocorrências', async ({ assert, client }) => {
  const userInfo = {
    "user_id": "1234",
    "name": "Foo"
  }
  const firebaseToken = jwt.sign(userInfo, 'poi')
  ioc.fake('Adonis/Services/Firebase', firebaseFake)
  let response = await client.post('user/signup').send({ token: firebaseToken }).end()

  const token = 'Bearer ' + response.body.data.token

  const admin = await Admin.create({ id: 1, name: "Admin", email: "admin@admin.com", password: "1234" })

  await OccurrenceCategory.create({ id: 'fire', description: 'Queimadas' })

  let payload = {
    coordinates: {
      latitude: '123',
      longitude: '456'
    },
    category_id: 'fire',
    num_photos: 1,
    num_videos: 1,
    num_audios: 1,
    name: 'nome',
    description: 'ola',
    criticity_level: 3
  }


  await client.post('occurrence').header('Authorization', token).send(payload).end()
  await client.post('occurrence').header('Authorization', token).send(payload).end()
  const x = await client.post('occurrence').header('Authorization', token).send(payload).end()
  ioc.restore('Adonis/Services/Firebase')

  console.log(x.body)

  // response = await client.get('occurrence-admin').loginVia(admin, 'jwt').end()


  // assert.lengthOf(response.body.data, 3)
  // assert.strictEqual(response.body.data[0].status, 'waiting')
})

// test('lista todas as ocorrências pendentes', async ({ assert, client }) => {
//   const userInfo = {
//     "user_id": "1234",
//     "name": "Foo"
//   }
//   const firebaseToken = jwt.sign(userInfo, 'poi')
//   ioc.fake('Adonis/Services/Firebase', firebaseFake)
//   let response = await client.post('user/signup').send({ token: firebaseToken }).end()
//   ioc.restore('Adonis/Services/Firebase')

//   const token = 'Bearer ' + response.body.data.token

//   const admin = await Admin.create({ id: 1, name: "Admin", email: "admin@admin.com", password: "1234" })

//   await OccurrenceCategory.create({ id: 'fire', description: 'Queimadas' })

//   let payload = {
//     coordinates: {
//       latitude: '123',
//       longitude: '456'
//     },
//     category_id: 'fire',
//     num_photos: 1,
//     num_videos: 1,
//     num_audios: 1,
//     name: 'nome',
//     description: 'ola',
//     criticity_level: 3
//   }

//   await client.post('occurrence').header('Authorization', token).send(payload).end()
//   await client.post('occurrence').header('Authorization', token).send(payload).end()
//   await client.post('occurrence').header('Authorization', token).send(payload).end()

//   response = await client.get('occurrence-admin').loginVia(admin, 'jwt').query({ status: 'waiting' }).end()

//   assert.lengthOf(response.body.data, 3)
//   assert.strictEqual(response.body.data[0].status, 'waiting')
// })



// test('lista todas as ocorrências aprovadas', async ({ assert, client }) => {
//   const userInfo = {
//     "user_id": "1234",
//     "name": "Foo"
//   }
//   const firebaseToken = jwt.sign(userInfo, 'poi')
//   ioc.fake('Adonis/Services/Firebase', firebaseFake)
//   let response = await client.post('user/signup').send({ token: firebaseToken }).end()
//   ioc.restore('Adonis/Services/Firebase')

//   const token = 'Bearer ' + response.body.data.token

//   const admin = await Admin.create({ id: 1, name: "Admin", email: "admin@admin.com", password: "1234" })

//   await OccurrenceCategory.create({ id: 'fire', description: 'Queimadas' })

//   let payload = {
//     coordinates: {
//       latitude: '123',
//       longitude: '456'
//     },
//     category_id: 'fire',
//     num_photos: 1,
//     num_videos: 1,
//     num_audios: 1,
//     name: 'nome',
//     description: 'ola',
//     criticity_level: 3
//   }

//   await client.post('occurrence').header('Authorization', token).send(payload).end()
//   await client.post('occurrence').header('Authorization', token).send(payload).end()
//   await client.post('occurrence').header('Authorization', token).send(payload).end()

//   const occurrence = await Occurrence.first()
//   occurrence.status = 'approved'
//   await occurrence.save()

//   response = await client.get('occurrence-admin').loginVia(admin, 'jwt').query({ status: 'approved' }).end()

//   assert.lengthOf(response.body.data, 1)
//   assert.strictEqual(response.body.data[0].status, 'approved')
// })


