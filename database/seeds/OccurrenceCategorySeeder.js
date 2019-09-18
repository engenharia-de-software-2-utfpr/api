'use strict'

/*
|--------------------------------------------------------------------------
| OccurrenceCategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const OccurrenceCategory = use('App/Models/OccurrenceCategory')

class OccurrenceCategorySeeder {
  async run() {
    await OccurrenceCategory.createMany([
      {
        name: 'fire',
        description: 'Queimada'
      },
      {
        name: 'solid_waste',
        description: 'Dejeto sólido'
      },
      {
        name: 'sewer',
        description: 'Esgoto'
      },
      {
        name: 'dengue',
        description: 'Foco de dengue'
      }
    ])
  }
}

module.exports = OccurrenceCategorySeeder
