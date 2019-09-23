'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/occurrence', 'OccurrenceController.create').validator('CreateOccurrence')
Route.get('/occurrence/near', 'OccurrenceController.near')
Route.get('/occurrence/:id', 'OccurrenceController.details')

Route.put('/occurrence-admin/:id/status', 'OccurrenceAdminController.updateStatus')
Route.get('/occurrence-admin', 'OccurrenceAdminController.index')


Route.post('/admin/signin', 'AdminController.signin')
