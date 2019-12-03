'use strict'

const Occurrence = use('App/Models/Occurrence')
const Database = use('Database')
const Resource = use('App/Models/Resource')
const Firebase = use('Adonis/Services/Firebase')

const Logger = use('Logger')

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

    async details({ request, params }) {
        
        const occurrence = await Occurrence.find(params.id)

        if (!occurrence) return { success: false, message: "occurrence not found", data: null }

        const medias = await Database
            .select('type', 'name')
            .from('resources')
            .where('occurrence_id', params.id)

        occurrence.medias = medias.filter(async (resource) => {
            return { 
                type: resource.type,
                url: await Firebase.generateUrl(resource.name)
            }
        })

        return { success: true, message: "occurrence found", data: occurrence }
    }
}

module.exports = OccurrenceAdminController
