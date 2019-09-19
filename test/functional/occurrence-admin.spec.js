'use strict'

const { test, trait } = use('Test/Suite')('OccurrenceAdmin')

const User = use('App/Models/User')
const Resource = use('App/Models/Resource')
const Occurrence = use('App/Models/Occurrence')
const OccurrenceCategory = use('App/Models/OccurrenceCategory')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('altera status de uma ocorrência', async ({ assert, client }) => {
  await User.create({ id: 1 })
  await OccurrenceCategory.create({ id: 'fire', description: 'Queimadas' })

  let payload = {
    coordinates: {
      latitude: '123',
      longitude: '456'
    },
    category_id: 'fire',
    resources: {
      photos: ['https://www.photo1.com', 'https://www.photo2.com', 'https://www.photo3.com',],
      video: 'https://www.video.com',
      audio: 'https://www.audio.com'
    },
    description: 'ola',
    criticity_level: 3
  }

  let response = await client.post('occurrence').send(payload).end()

  let occurrenceObj = await Occurrence.find(response.body.data.id)
  assert.strictEqual(occurrenceObj.status, "waiting")

  await client.put('occurrence/' + occurrenceObj.id).send({ status: 'approved' }).end()

  occurrenceObj = await Occurrence.find(response.body.data.id)
  assert.strictEqual(occurrenceObj.status, "approved")

  await client.put('occurrence/' + occurrenceObj.id).send({ status: 'resolved' }).end()

  occurrenceObj = await Occurrence.find(response.body.data.id)
  assert.strictEqual(occurrenceObj.status, "resolved")
})

test('lista todas as ocorrências pendentes', async ({ assert, client }) => {
  await User.create({ id: 1 })
  await OccurrenceCategory.create({ id: 'fire', description: 'Queimadas' })

  let payload = {
    coordinates: {
      latitude: '123',
      longitude: '456'
    },
    category_id: 'fire',
    resources: {
      photos: ['https://www.photo1.com', 'https://www.photo2.com', 'https://www.photo3.com',],
      video: 'https://www.video.com',
      audio: 'https://www.audio.com'
    },
    description: 'ola',
    criticity_level: 3
  }

  await client.post('occurrence').send(payload).end()
  await client.post('occurrence').send(payload).end()
  await client.post('occurrence').send(payload).end()

  const response = await client.get('occurrence').query({ status: 'waiting' }).end()

  assert.lengthOf(response.body.data, 3)
  assert.strictEqual(response.body.data[0].status, 'waiting')
})



test('lista todas as ocorrências aprovadas', async ({ assert, client }) => {
  await User.create({ id: 1 })
  await OccurrenceCategory.create({ id: 'fire', description: 'Queimadas' })

  let payload = {
    coordinates: {
      latitude: '123',
      longitude: '456'
    },
    category_id: 'fire',
    resources: {
      photos: ['https://www.photo1.com', 'https://www.photo2.com', 'https://www.photo3.com',],
      video: 'https://www.video.com',
      audio: 'https://www.audio.com'
    },
    description: 'ola',
    criticity_level: 3
  }

  await client.post('occurrence').send(payload).end()
  await client.post('occurrence').send(payload).end()
  await client.post('occurrence').send(payload).end()

  const occurrence = await Occurrence.first()
  occurrence.status = 'approved'
  await occurrence.save()

  const response = await client.get('occurrence').query({ status: 'approved' }).end()

  assert.lengthOf(response.body.data, 1)
  assert.strictEqual(response.body.data[0].status, 'approved')
})


