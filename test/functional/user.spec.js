'use strict'

const jwt = require('jsonwebtoken')

const { test, trait } = use('Test/Suite')('User')

const { ioc } = use('@adonisjs/fold')

const User = use('App/Models/User')
const Resource = use('App/Models/Resource')
const Occurrence = use('App/Models/Occurrence')
const OccurrenceCategory = use('App/Models/OccurrenceCategory')

trait('Test/ApiClient')
trait('DatabaseTransactions')


test('cadastra um novo usuário', async ({ assert, client }) => {
  const userInfo = {
    "user_id": "1234",
    "name": "Foo"
  }

  const testToken = jwt.sign(userInfo, 'poi')

  ioc.fake('Adonis/Services/Firebase', () => {
    return {
      async decodeToken(token) {
        try {
          return jwt.verify(token, 'poi')
        } catch (error) {
          return null
        }
      }
    }
  })

  const response = await client.post('user/signup').send({ token: testToken }).end()
  ioc.restore('Adonis/Services/Firebase')

  response.assertStatus(200)
  response.assertJSONSubset({
    success: true,
    message: "user returned",
    data: { id: userInfo.user_id, name: userInfo.name }
  })

  const user = await User.find(userInfo.user_id)
  assert.isNotNull(user)
})

test('retorna o usuário se já estiver cadastrado', async ({ assert, client }) => {

  const userInfo = {
    "user_id": "1234",
    "name": "Foo"
  }
  await User.create({ id: userInfo.user_id, name: userInfo.name })

  const testToken = jwt.sign(userInfo, 'poi')

  ioc.fake('Adonis/Services/Firebase', () => {
    return {
      async decodeToken(token) {
        try {
          return jwt.verify(token, 'poi')
        } catch (error) {
          return null
        }
      }
    }
  })

  const response = await client.post('user/signup').send({ token: testToken }).end()
  ioc.restore('Adonis/Services/Firebase')


  response.assertStatus(200)
  response.assertJSONSubset({
    success: true,
    message: "user returned",
    data: { id: userInfo.user_id, name: userInfo.name }
  })

  const users = (await User.all()).toJSON()

  assert.lengthOf(users, 1)
})


test('retorna erro se o token for inválido', async ({ assert, client }) => {
  const userInfo = {
    "user_id": "1234",
    "name": "Foo"
  }

  const testToken = jwt.sign(userInfo, 'poi') + 'haha'

  ioc.fake('Adonis/Services/Firebase', () => {
    return {
      async decodeToken(token) {
        try {
          return jwt.verify(token, 'poi')
        } catch (error) {
          return null
        }
      }
    }
  })

  const response = await client.post('user/signup').send({ token: testToken }).end()
  ioc.restore('Adonis/Services/Firebase')

  response.assertStatus(401)
  response.assertJSONSubset({
    success: false,
    message: "error decoding token",
    data: null
  })

  const user = await User.find(userInfo.user_id)
  assert.isNull(user)
})