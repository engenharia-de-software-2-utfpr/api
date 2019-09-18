'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OccurrenceSchema extends Schema {
  up() {
    this.create('occurrences', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.foreign('user_id').references('users.id')
      table.string('category_name').notNullable()
      table.foreign('category_name').references('occurrence_categories.name')
      table.string('latitude').notNullable()
      table.string('longitude').notNullable()
      table.string('description').notNullable()
      table.integer('criticity_level').notNullable()
      table.enu('status', ['waiting', 'approved', 'resolved']).defaultTo('waiting')
      table.integer('h3_index').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('occurrences')
  }
}

module.exports = OccurrenceSchema