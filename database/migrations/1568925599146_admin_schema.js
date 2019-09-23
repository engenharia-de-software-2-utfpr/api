'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdminSchema extends Schema {
  up() {
    this.create('admins', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('email').unique().notNullable()
      table.string('password').notNullable()
      table.boolean('is_super').defaultTo(false)
      table.timestamps()
    })
  }

  down() {
    this.drop('admins')
  }
}

module.exports = AdminSchema
