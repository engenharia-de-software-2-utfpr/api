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
          "user_id": '1234',
          "category_id": "fire",
          "latitude": "-24.0389848",
          "longitude": "-52.3754754",
          "description": "Lorem ipsum",
          "criticity_level": 3,
          "status": "waiting",
          "h3_index": "87dee9d18ffffff"
        },
        {
          "user_id": '1234',
          "category_id": "fire",
          "latitude": "-24.042547545179502",
          "longitude": "-52.37130589121287",
          "description": "Lorem ipsum blablabla",
          "criticity_level": 3,
          "status": "waiting",
          "h3_index": "87dee9d18ffffff"
        },
        {
          "user_id": '1234',
          "category_id": "dengue",
          "latitude": "-24.05097357986749",
          "longitude": "-52.377711006340434",
          "description": "Lorem ipsum blablabla",
          "criticity_level": 5,
          "status": "approved",
          "h3_index": "87dee9d18ffffff"
        },
        {
          "user_id": '1234',
          "category_id": "dengue",
          "latitude": "-24.050444519540484",
          "longitude": "-52.39184088343089",
          "description": "Lorem ipsum blablabla",
          "criticity_level": 5,
          "status": "rejected",
          "h3_index": "87dee9d18ffffff"
        },
        {
          "user_id": '1234',
          "category_id": "dengue",
          "latitude": "-24.045957216514427",
          "longitude": "-52.39697999590342",
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
