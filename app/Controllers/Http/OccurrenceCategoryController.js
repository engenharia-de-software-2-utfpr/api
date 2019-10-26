'use strict'

const OccurrenceCategory = use('App/Models/OccurrenceCategory')


class OccurrenceCategoryController {

    async index() {
        return await OccurrenceCategory.all()
    }
}

module.exports = OccurrenceCategoryController
