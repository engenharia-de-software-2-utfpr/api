'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OccurrenceCategorySchema extends Schema {
  up() {
    this.create('occurrence_categories', (table) => {
      table.string('id').primary()
      table.string('description').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('occurrence_categories')
  }
}

module.exports = OccurrenceCategorySchema
