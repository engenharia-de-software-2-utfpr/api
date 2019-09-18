'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Occurrence extends Model {
    user() {
        return this.hasOne('App/Models/User')
    }

    category() {
        return this.hasOne('App/Models/Category')
    }

    resources() {
        return this.hasMany('App/Models/Resource')
    }
}

module.exports = Occurrence
