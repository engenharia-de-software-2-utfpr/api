// 'use strict'

// const jwt = require('jsonwebtoken')


// const { test, trait } = use('Test/Suite')('Occurrence')
// const { ioc } = use('@adonisjs/fold')

// const User = use('App/Models/User')
// const Resource = use('App/Models/Resource')
// const Occurrence = use('App/Models/Occurrence')
// const OccurrenceCategory = use('App/Models/OccurrenceCategory')

// trait('Test/ApiClient')
// trait('DatabaseTransactions')


// const firebaseFake = () => {
//   return {
//     async decodeToken(token) {
//       try {
//         return jwt.verify(token, 'poi')
//       } catch (error) {
//         return null
//       }
//     },

//     async generateUrl(fileName) {
//       return 'www.url.com'
//     }
//   }
// }


// test('Retorna erro se a coordenada é inválida ao criar ocorrência (não encontrou um índice H3)', async ({ assert, client }) => {

//   const userInfo = {
//     "user_id": "1234",
//     "name": "Foo"
//   }
//   const firebaseToken = jwt.sign(userInfo, 'poi')
//   ioc.fake('Adonis/Services/Firebase', firebaseFake)
//   let response = await client.post('user/signup').send({ token: firebaseToken }).end()
//   ioc.restore('Adonis/Services/Firebase')

//   const token = 'Bearer ' + response.body.data.token

//   await OccurrenceCategory.create({ id: 'fire', description: 'Queimadas' })

//   const payload = {
//     coordinates: {
//       latitude: 'a',
//       longitude: 'b'
//     },
//     category_id: 'fire',
//     num_photos: 1,
//     num_videos: 1,
//     num_audios: 1,
//     description: 'ola',
//     criticity_level: 3
//   }

//   response = await client.post('occurrence').header('Authorization', token).send(payload).end()

//   response.assertStatus(200)
//   response.assertJSONSubset({
//     success: false,
//     message: "invalid coordinates"
//   })
// })


// test('Cria uma ocorrência passando todas as informações', async ({ assert, client }) => {

//   const userInfo = {
//     "user_id": "1234",
//     "name": "Foo"
//   }
//   const firebaseToken = jwt.sign(userInfo, 'poi')
//   ioc.fake('Adonis/Services/Firebase', firebaseFake)
//   let response = await client.post('user/signup').send({ token: firebaseToken }).end()
//   ioc.restore('Adonis/Services/Firebase')

//   const token = 'Bearer ' + response.body.data.token

//   await OccurrenceCategory.create({ id: 'fire', description: 'Queimadas' })

//   const payload = {
//     coordinates: {
//       latitude: '123',
//       longitude: '456'
//     },
//     category_id: 'fire',
//     num_photos: 1,
//     num_videos: 1,
//     num_audios: 1,
//     description: 'ola',
//     criticity_level: 3
//   }

//   ioc.fake('Adonis/Services/Firebase', firebaseFake)
//   response = await client.post('occurrence').header('Authorization', token).send(payload).end()
//   ioc.restore('Adonis/Services/Firebase')



//   response.assertStatus(200)
//   // response.assertJSONSubset({
//   //   success: true,
//   //   data: { photos: ["www.url.com"], videos: ["www.url.com"], audios: ["www.url.com"] }
//   // })

//   // Algum bug sinistro no Adonis está ferrando com os fakes
//   // https://github.com/adonisjs/fold/issues/50

//   response.assertJSONSubset({ success: true })
//   assert.lengthOf(response.body.data.photos, 1)
//   assert.lengthOf(response.body.data.videos, 1)
//   assert.lengthOf(response.body.data.audios, 1)

//   const responseObj = await Occurrence.find(response.body.data.id)
//   const resources = (await responseObj.resources().fetch()).toJSON()

//   assert.isNotNull(responseObj)
//   assert.lengthOf(resources, 3)
// })

// test('cria uma ocorrência passando 2 fotos e um vídeo', async ({ assert, client }) => {

//   const userInfo = {
//     "user_id": "1234",
//     "name": "Foo"
//   }
//   const firebaseToken = jwt.sign(userInfo, 'poi')
//   ioc.fake('Adonis/Services/Firebase', firebaseFake)
//   let response = await client.post('user/signup').send({ token: firebaseToken }).end()

//   const token = 'Bearer ' + response.body.data.token

//   await OccurrenceCategory.create({ id: 'fire', description: 'Queimadas' })

//   const payload = {
//     coordinates: {
//       latitude: '123',
//       longitude: '456'
//     },
//     category_id: 'fire',
//     num_photos: 2,
//     num_videos: 1,
//     num_audios: 0,
//     description: 'ola',
//     criticity_level: 3
//   }
//   response = await client.post('occurrence').header('Authorization', token).send(payload).end()

//   response.assertStatus(200)
//   response.assertJSONSubset({ success: true })
//   assert.lengthOf(response.body.data.photos, 2)
//   assert.lengthOf(response.body.data.videos, 1)
//   assert.lengthOf(response.body.data.audios, 0)
//   ioc.restore('Adonis/Services/Firebase')

//   const responseObj = await Occurrence.find(response.body.data.id)
//   const resources = (await responseObj.resources().fetch()).toJSON()

//   assert.isNotNull(responseObj)
//   assert.lengthOf(resources, 3)
// })


// test('retorna erro se coordenada é inválida ao listar ocorrências', async ({ assert, client }) => {

//   const userInfo = {
//     "user_id": "1234",
//     "name": "Foo"
//   }
//   const firebaseToken = jwt.sign(userInfo, 'poi')
//   ioc.fake('Adonis/Services/Firebase', firebaseFake)
//   let response = await client.post('user/signup').send({ token: firebaseToken }).end()
//   ioc.restore('Adonis/Services/Firebase')

//   const token = 'Bearer ' + response.body.data.token

//   const payload = {
//     latitude: 'a',
//     longitude: '456'
//   }
//   response = await client.get('occurrence/near').header('Authorization', token).query(payload).end()

//   response.assertStatus(200)
//   response.assertJSONSubset({
//     success: false,
//     message: "invalid coordinates"
//   })
// })

// test('retorna um array vazio se não houverem ocorrências na área', async ({ assert, client }) => {
//   const userInfo = {
//     "user_id": "1234",
//     "name": "Foo"
//   }
//   const firebaseToken = jwt.sign(userInfo, 'poi')
//   ioc.fake('Adonis/Services/Firebase', firebaseFake)
//   let response = await client.post('user/signup').send({ token: firebaseToken }).end()
//   ioc.restore('Adonis/Services/Firebase')

//   const token = 'Bearer ' + response.body.data.token
//   const payload = {
//     latitude: '123',
//     longitude: '456'
//   }

//   response = await client.get('occurrence/near').header('Authorization', token).query(payload).end()

//   response.assertStatus(200)
//   response.assertJSONSubset({
//     success: true,
//     message: "occurrences found",
//     data: []
//   })
// })

// test('retorna ocorrências na área', async ({ assert, client }) => {
//   const userInfo = {
//     "user_id": "1234",
//     "name": "Foo"
//   }
//   const firebaseToken = jwt.sign(userInfo, 'poi')
//   ioc.fake('Adonis/Services/Firebase', firebaseFake)
//   let response = await client.post('user/signup').send({ token: firebaseToken }).end()
//   ioc.restore('Adonis/Services/Firebase')

//   const token = 'Bearer ' + response.body.data.token
//   await OccurrenceCategory.create({ id: 'fire', description: 'Queimadas' })

//   let payload = {
//     coordinates: {
//       latitude: '-24.0389848',
//       longitude: '-52.3754754'
//     },
//     category_id: 'fire',
//     num_photos: 1,
//     num_videos: 1,
//     num_audios: 1,
//     description: 'ola',
//     criticity_level: 3
//   }
//   response = await client.post('occurrence').header('Authorization', token).send(payload).end()

//   const occurrenceObj = await Occurrence.find(response.body.data.id)
//   occurrenceObj.status = 'approved'
//   await occurrenceObj.save()

//   payload = {
//     latitude: '-24.0389848',
//     longitude: '-52.3754754'
//   }

//   response = await client.get('occurrence/near').header('Authorization', token).query(payload).end()

//   response.assertStatus(200)
//   response.assertJSONSubset({
//     success: true,
//     message: "occurrences found",
//   })

//   assert.lengthOf(response.body.data, 1)
// })

// test('retorna ocorrências na área (kRing vizinho)', async ({ assert, client }) => {
//   const userInfo = {
//     "user_id": "1234",
//     "name": "Foo"
//   }
//   const firebaseToken = jwt.sign(userInfo, 'poi')
//   ioc.fake('Adonis/Services/Firebase', firebaseFake)
//   let response = await client.post('user/signup').send({ token: firebaseToken }).end()
//   ioc.restore('Adonis/Services/Firebase')

//   const token = 'Bearer ' + response.body.data.token

//   await OccurrenceCategory.create({ id: 'fire', description: 'Queimadas' })

//   let payload = {
//     coordinates: {
//       latitude: '-24.044337',
//       longitude: '-52.406844'
//     },
//     category_id: 'fire',
//     num_photos: 1,
//     num_videos: 1,
//     num_audios: 1,
//     description: 'ola',
//     criticity_level: 3
//   }
//   response = await client.post('occurrence').header('Authorization', token).send(payload).end()

//   const occurrenceObj = await Occurrence.find(response.body.data.id)
//   occurrenceObj.status = 'approved'
//   await occurrenceObj.save()

//   payload = {
//     latitude: '-24.035659',
//     longitude: '-52.3763614'
//   }

//   response = await client.get('occurrence/near').header('Authorization', token).query(payload).end()

//   response.assertStatus(200)
//   response.assertJSONSubset({
//     success: true,
//     message: "occurrences found",
//   })

//   assert.lengthOf(response.body.data, 1)
// })

// test('retorna vazio (fora da borda do kRing vizinho)', async ({ assert, client }) => {
//   const userInfo = {
//     "user_id": "1234",
//     "name": "Foo"
//   }
//   const firebaseToken = jwt.sign(userInfo, 'poi')
//   ioc.fake('Adonis/Services/Firebase', firebaseFake)
//   let response = await client.post('user/signup').send({ token: firebaseToken }).end()
//   ioc.restore('Adonis/Services/Firebase')

//   const token = 'Bearer ' + response.body.data.token

//   await OccurrenceCategory.create({ id: 'fire', description: 'Queimadas' })

//   let payload = {
//     coordinates: {
//       latitude: '-24.043897',
//       longitude: '-52.407203'
//     },
//     category_id: 'fire',
//     num_photos: 1,
//     num_videos: 1,
//     num_audios: 1,
//     description: 'ola',
//     criticity_level: 3
//   }
//   response = await client.post('occurrence').header('Authorization', token).send(payload).end()

//   const occurrenceObj = await Occurrence.find(response.body.data.id)
//   occurrenceObj.status = 'approved'
//   await occurrenceObj.save()

//   payload = {
//     latitude: '-24.035659',
//     longitude: '-52.3763614'
//   }

//   response = await client.get('occurrence/near').header('Authorization', token).query(payload).end()

//   response.assertStatus(200)
//   response.assertJSONSubset({
//     success: true,
//     message: "occurrences found",
//     data: []
//   })

//   assert.lengthOf(response.body.data, 0)
// })

// test('retorna 2 ocorrências', async ({ assert, client }) => {
//   const userInfo = {
//     "user_id": "1234",
//     "name": "Foo"
//   }
//   const firebaseToken = jwt.sign(userInfo, 'poi')
//   ioc.fake('Adonis/Services/Firebase', firebaseFake)
//   let response = await client.post('user/signup').send({ token: firebaseToken }).end()

//   const token = 'Bearer ' + response.body.data.token

//   await OccurrenceCategory.create({ id: 'fire', description: 'Queimadas' })

//   let payload = {
//     coordinates: {
//       latitude: '-24.043897',
//       longitude: '-52.407203'
//     },
//     category_id: 'fire',
//     num_photos: 1,
//     num_videos: 1,
//     num_audios: 1,
//     description: 'ola',
//     criticity_level: 3
//   }
//   response = await client.post('occurrence').header('Authorization', token).send(payload).end()

//   let occurrenceObj = await Occurrence.find(response.body.data.id)
//   occurrenceObj.status = 'approved'
//   await occurrenceObj.save()

//   payload = {
//     coordinates: {
//       latitude: '-24.044337',
//       longitude: '-52.406844'
//     },
//     category_id: 'fire',
//     num_photos: 1,
//     num_videos: 1,
//     num_audios: 1,
//     description: 'ola',
//     criticity_level: 3
//   }
//   response = await client.post('occurrence').header('Authorization', token).send(payload).end()

//   occurrenceObj = await Occurrence.find(response.body.data.id)
//   occurrenceObj.status = 'approved'
//   await occurrenceObj.save()

//   payload = {
//     latitude: '-24.044732',
//     longitude: '-52.406179'
//   }

//   response = await client.get('occurrence/near').header('Authorization', token).query(payload).end()
//   ioc.restore('Adonis/Services/Firebase')

//   response.assertStatus(200)
//   response.assertJSONSubset({
//     success: true,
//     message: "occurrences found",
//   })

//   assert.lengthOf(response.body.data, 2)
// })



// test('retorna detalhes de uma ocorrência', async ({ assert, client }) => {
//   const userInfo = {
//     "user_id": "1234",
//     "name": "Foo"
//   }
//   const firebaseToken = jwt.sign(userInfo, 'poi')
//   ioc.fake('Adonis/Services/Firebase', firebaseFake)
//   let response = await client.post('user/signup').send({ token: firebaseToken }).end()
//   ioc.restore('Adonis/Services/Firebase')

//   const token = 'Bearer ' + response.body.data.token
//   await OccurrenceCategory.create({ id: 'fire', description: 'Queimadas' })

//   let payload = {
//     coordinates: {
//       latitude: '-24.0389848',
//       longitude: '-52.3754754'
//     },
//     category_id: 'fire',
//     num_photos: 1,
//     num_videos: 1,
//     num_audios: 1,
//     description: 'ola',
//     criticity_level: 3
//   }

//   response = await client.post('occurrence').header('Authorization', token).send(payload).end()

//   response = await client.get('occurrence/' + response.body.data.id).header('Authorization', token).query(payload).end()


//   response.assertStatus(200)
//   response.assertJSONSubset({
//     success: true,
//     message: "occurrence found",
//   })
// })

// test('retorna erro se ocorrência não existe ao buscar detalhes', async ({ assert, client }) => {
//   const userInfo = {
//     "user_id": "1234",
//     "name": "Foo"
//   }
//   const firebaseToken = jwt.sign(userInfo, 'poi')
//   ioc.fake('Adonis/Services/Firebase', firebaseFake)
//   let response = await client.post('user/signup').send({ token: firebaseToken }).end()
//   ioc.restore('Adonis/Services/Firebase')

//   const token = 'Bearer ' + response.body.data.token

//   response = await client.get('occurrence/1').header('Authorization', token).send({}).end()

//   response.assertStatus(200)
//   response.assertJSONSubset({
//     success: false,
//     message: "occurrence not found",
//   })
// })