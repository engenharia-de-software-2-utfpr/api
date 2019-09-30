'use strict'

/*
|--------------------------------------------------------------------------
| OccurrenceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const Occurrence = use('App/Models/Occurrence')


class OccurrenceSeeder {
  async run() {



    await Occurrence.createMany(
      [
        {
          "user_id": 1,
          "category_id": "fire",
          "latitude": "-24.0389848",
          "longitude": "-52.3754754",
          "name": "Nome",
          "description": "Lorem ipsum",
          "criticity_level": 3,
          "status": "waiting",
          "h3_index": "87dee9d18ffffff"
        },
        {
          "user_id": 1,
          "category_id": "fire",
          "latitude": "-24.0389848",
          "longitude": "-52.3754754",
          "name": "Nome 2",
          "description": "Lorem ipsum blablabla",
          "criticity_level": 3,
          "status": "waiting",
          "h3_index": "87dee9d18ffffff"
        },
        {
          "user_id": 1,
          "category_id": "dengue",
          "latitude": "-24.0389848",
          "longitude": "-52.3754754",
          "name": "denguezinha de leve",
          "description": "Lorem ipsum blablabla",
          "criticity_level": 5,
          "status": "approved",
          "h3_index": "87dee9d18ffffff"
        },
        {
          "user_id": 1,
          "category_id": "dengue",
          "latitude": "-24.0389848",
          "longitude": "-52.3754754",
          "name": "denguezinha de leve rejeitada",
          "description": "Lorem ipsum blablabla",
          "criticity_level": 5,
          "status": "rejected",
          "h3_index": "87dee9d18ffffff"
        },
        {
          "user_id": 1,
          "category_id": "dengue",
          "latitude": "-24.0389848",
          "longitude": "-52.3754754",
          "name": "denguezinha de leve resolvida",
          "description": "Lorem ipsum blablabla",
          "criticity_level": 5,
          "status": "resolved",
          "h3_index": "87dee9d18ffffff"
        }
      ]
    )
  }
}

module.exports = OccurrenceSeeder
