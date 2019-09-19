'use strict'

/*
|--------------------------------------------------------------------------
| AdminSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const Admin = use('App/Models/Admin')

class AdminSeeder {
  async run() {
    await Admin.create({
      name: 'Superadministrador',
      email: 'admin@admin.com',
      password: '12345678',
      is_super: true
    })
  }
}

module.exports = AdminSeeder
