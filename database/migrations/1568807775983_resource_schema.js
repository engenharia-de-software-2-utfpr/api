'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ResourceSchema extends Schema {
  up() {
    this.create('resources', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.enu('type', ['photo', 'video', 'audio']).notNullable()
      table.integer('occurrence_id').notNullable()
      table.foreign('occurrence_id').references('occurrences.id')
      table.timestamps()
    })
  }

  down() {
    this.drop('resources')
  }
}

module.exports = ResourceSchema
