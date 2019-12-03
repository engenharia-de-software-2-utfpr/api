'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FormSchema extends Schema {
  up () {
    this.create('forms', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.string('url').notNullable()
      table.boolean('active')
      table.timestamps()
    })
  }

  down () {
    this.drop('forms')
  }
}

module.exports = FormSchema
