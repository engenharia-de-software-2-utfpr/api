'use strict'

const Occurrence = use('App/Models/Occurrence')

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

        const medias = [
            {
                type: 'video',
                url: 'https://www.brandeps.com/icon-download/V/Video-clip-icon-vector-01.svg'
            },
            {
                type: 'photo',
                url: 'https://rccradio.fm/wp-content/themes/bacata/images/thumbnail-default.jpg'
            },
            {
                type: 'audio',
                url: 'https://cdn.pixabay.com/photo/2017/11/10/05/34/sound-2935466_960_720.png'
            },
        ]

        occurrence.medias = medias

        return { success: true, message: "occurrence found", data: occurrence }
    }
}

module.exports = OccurrenceAdminController
