'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OccurrenceSchema extends Schema {
  up() {
    this.create('occurrences', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.foreign('user_id').references('users.id')
      table.string('category_id').notNullable()
      table.foreign('category_id').references('occurrence_categories.id')
      table.string('latitude').notNullable()
      table.string('longitude').notNullable()
      table.string('name').notNullable()
      table.string('description')/* .notNullable() */
      table.integer('criticity_level').notNullable()
      table.enu('status', ['waiting', 'rejected', 'approved', 'resolved']).defaultTo('waiting')
      table.string('h3_index').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('occurrences')
  }
}

module.exports = OccurrenceSchema
