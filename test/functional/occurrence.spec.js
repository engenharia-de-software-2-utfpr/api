'use strict'

const { test, trait } = use('Test/Suite')('Occurrence')

const User = use('App/Models/User')
const Resource = use('App/Models/Resource')
const Occurrence = use('App/Models/Occurrence')
const OccurrenceCategory = use('App/Models/OccurrenceCategory')

trait('Test/ApiClient')
trait('DatabaseTransactions')


test('retorna erro se a coordenada é inválida ao criar ocorrência (não encontrou um índice H3)', async ({ assert, client }) => {

  await User.create({ id: 1 })
  await OccurrenceCategory.create({ id: 'fire', description: 'Queimadas' })

  const payload = {
    coordinates: {
      latitude: 'a',
      longitude: 'b'
    },
    category_id: 'fire',
    resources: {
      photos: ['https://www.photo1.com', 'https://www.photo2.com', 'https://www.photo3.com',],
      video: 'https://www.video.com',
      audio: 'https://www.audio.com'
    },
    name: 'nome',
    description: 'ola',
    criticity_level: 3
  }

  const response = await client.post('occurrence').send(payload).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    success: false,
    message: "invalid coordinates"
  })
})

test('cria uma ocorrência passando todas as informações', async ({ assert, client }) => {

  await User.create({ id: 1 })
  await OccurrenceCategory.create({ id: 'fire', description: 'Queimadas' })

  const payload = {
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
    name: 'nome',
    description: 'ola',
    criticity_level: 3
  }

  const response = await client.post('occurrence').send(payload).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    success: true
  })

  const responseObj = await Occurrence.find(response.body.data.id)
  const resources = (await responseObj.resources().fetch()).toJSON()

  assert.isNotNull(responseObj)
  assert.lengthOf(resources, 5)
})

test('cria uma ocorrência passando 2 fotos e um vídeo', async ({ assert, client }) => {

  await User.create({ id: 1 })
  await OccurrenceCategory.create({ id: 'fire', description: 'Queimadas' })

  const payload = {
    coordinates: {
      latitude: '123',
      longitude: '456'
    },
    category_id: 'fire',
    resources: {
      photos: ['https://www.photo1.com', 'https://www.photo2.com'],
      video: 'https://www.video.com'
    },
    name: 'nome',
    description: 'ola',
    criticity_level: 3
  }

  const response = await client.post('occurrence').send(payload).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    success: true
  })

  const responseObj = await Occurrence.find(response.body.data.id)
  const resources = (await responseObj.resources().fetch()).toJSON()

  assert.isNotNull(responseObj)
  assert.lengthOf(resources, 3)
})


test('retorna erro se coordenada é inválida ao listar ocorrências', async ({ assert, client }) => {
  const payload = {
    latitude: 'a',
    longitude: '456'
  }

  const response = await client.get('occurrence/near').query(payload).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    success: false,
    message: "invalid coordinates"
  })
})

test('retorna um array vazio se não houverem ocorrências na área', async ({ assert, client }) => {

  const payload = {
    latitude: '123',
    longitude: '456'
  }

  const response = await client.get('occurrence/near').query(payload).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    success: true,
    message: "occurrences found",
    data: []
  })
})

test('retorna ocorrências na área', async ({ assert, client }) => {
  await User.create({ id: 1 })
  await OccurrenceCategory.create({ id: 'fire', description: 'Queimadas' })

  let payload = {
    coordinates: {
      latitude: '-24.0389848',
      longitude: '-52.3754754'
    },
    category_id: 'fire',
    resources: {
      photos: ['https://www.photo1.com', 'https://www.photo2.com', 'https://www.photo3.com',],
      video: 'https://www.video.com',
      audio: 'https://www.audio.com'
    },
    name: 'nome',
    description: 'ola',
    criticity_level: 3
  }

  let response = await client.post('occurrence').send(payload).end()

  const occurrenceObj = await Occurrence.find(response.body.data.id)
  occurrenceObj.status = 'approved'
  await occurrenceObj.save()

  payload = {
    latitude: '-24.0389848',
    longitude: '-52.3754754'
  }

  response = await client.get('occurrence/near').query(payload).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    success: true,
    message: "occurrences found",
  })

  assert.lengthOf(response.body.data, 1)
})

test('retorna detalhes de uma ocorrência', async ({ assert, client }) => {
  await User.create({ id: 1 })
  await OccurrenceCategory.create({ id: 'fire', description: 'Queimadas' })

  let payload = {
    coordinates: {
      latitude: '-24.0389848',
      longitude: '-52.3754754'
    },
    category_id: 'fire',
    resources: {
      photos: ['https://www.photo1.com', 'https://www.photo2.com', 'https://www.photo3.com',],
      video: 'https://www.video.com',
      audio: 'https://www.audio.com'
    },
    name: 'nome',
    description: 'ola',
    criticity_level: 3
  }

  let response = await client.post('occurrence').send(payload).end()


  response = await client.get('occurrence/' + response.body.data.id).query(payload).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    success: true,
    message: "occurrence found",
  })
})

test('retorna erro se ocorrência não existe ao buscar detalhes', async ({ assert, client }) => {

  const response = await client.get('occurrence/1').send({}).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    success: false,
    message: "occurrence not found",
  })
})