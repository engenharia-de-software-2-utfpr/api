// 'use strict'

// const { test, trait } = use('Test/Suite')('Occurrence Category')

// const OccurrenceCategory = use('App/Models/OccurrenceCategory')

// trait('Test/ApiClient')
// trait('DatabaseTransactions')
// test('Retorna lista de categorias', async ({ assert, client }) => {

//   await OccurrenceCategory.create({ id: 'fire', description: 'Queimadas' })
//   await OccurrenceCategory.create({ id: 'dengue', description: 'Dengue' })
//   await OccurrenceCategory.create({ id: 'sewer', description: 'Esgoto' })

//   const response = await client.get('occurrence-category').end()
//   response.assertStatus(200)
//   response.assertJSONSubset(
//     [{
//       id: 'fire',
//       description: 'Queimadas',
//     },
//     {
//       id: 'dengue',
//       description: 'Dengue',
//     },
//     {
//       id: 'sewer',
//       description: 'Esgoto',
//     }]
//   )
// })
