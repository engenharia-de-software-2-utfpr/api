'use strict'

const { test, trait } = use('Test/Suite')('Admin')

const Admin = use('App/Models/Admin')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('Retorna erro se email não existir', async ({ assert, client }) => {

  const payload = {
    email: 'admin@admin.com',
    password: '12345678'
  }

  const response = await client.post('admin/signin').send(payload).end()
  response.assertStatus(401)
  response.assertJSONSubset({
    success: false,
  })
  assert.isNull(response.body.data)

})

test('Retorna erro se a senha for incorreta', async ({ assert, client }) => {

  await Admin.create({
    name: 'Superadministrador',
    email: 'admin@admin.com',
    password: '12345678',
    is_super: true
  })

  const payload = {
    email: 'admin@admin.com',
    password: '1234567'
  }

  const response = await client.post('admin/signin').send(payload).end()
  console.log(response)
  response.assertStatus(401)
  response.assertJSONSubset({
    success: false,
  })


  assert.isNull(response.body.data)

})


test('Retorna um token de acesso', async ({ assert, client }) => {

  await Admin.create({
    name: 'Superadministrador',
    email: 'admin@admin.com',
    password: '12345678',
    is_super: true
  })

  const payload = {
    email: 'admin@admin.com',
    password: '12345678'
  }

  const response = await client.post('admin/signin').send(payload).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    success: true,
  })

  assert.isNotNull(response.body.data)
})


