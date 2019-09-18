'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Resource extends Model {
    occurrence() {
        return this.hasOne('App/Models/Occurrence')
    }
}

module.exports = Resource
