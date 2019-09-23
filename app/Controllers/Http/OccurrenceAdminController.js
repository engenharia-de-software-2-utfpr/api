'use strict'

const Occurrence = use('App/Models/Occurrence')

class OccurrenceAdminController {
    async index({ request }) {
        const { status } = request.only(['status'])

        if (!status) {
            const data = await Occurrence.query().fetch()
            return { success: true, message: 'all occurrences', data }
        }

        const data = await Occurrence.query().where('status', status).fetch()
        return { success: true, message: 'occurrences by status', data }
    }

    async updateStatus({ request, params }) {
        const { status } = request.only(['status'])
        const occurrence = await Occurrence.find(params.id)
        occurrence.status = status
        const data = await occurrence.save()

        return { success: true, message: 'status updated', data }
    }
}

module.exports = OccurrenceAdminController
