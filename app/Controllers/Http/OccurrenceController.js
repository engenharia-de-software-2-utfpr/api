'use strict'

const h3 = require('h3-js')

const Database = use('Database')
const Occurrence = use('App/Models/Occurrence')
const Resource = use('App/Models/Resource')
const OccurrenceCategory = use('App/Models/OccurrenceCategory')



class OccurrenceController {

    async details({ request, params }) {
        const occurrence = await Occurrence.find(params.id)

        if (!occurrence) return { success: false, message: "occurrence not found", data: null }

        return { success: true, message: "occurrence found", data: occurrence }
    }

    async index({ request }) {
        const data = request.only(['latitude', 'longitude'])

        const h3Index = h3.geoToH3(data.latitude, data.longitude, 7)
        if (!h3Index)
            return { success: false, message: "invalid coordinates", data: null }

        const kRing = h3.kRing(h3Index, 1);

        const occurrences = await Database
            .select('id', 'category_name', 'latitude', 'longitude')
            .from('occurrences')
            .whereIn('h3_index', kRing)

        return { success: true, message: "occurrences found", data: occurrences }
    }


    async create({ request }) {
        const data = request.only(['coordinates', 'category_name', 'resources', 'description', 'criticity_level'])

        const category = await OccurrenceCategory.findByOrFail('name', data.category_name)

        const h3Index = h3.geoToH3(data.coordinates.latitude, data.coordinates.longitude, 7)
        if (!h3Index)
            return { success: false, message: "invalid coordinates", data: null }


        const occurrence = await Occurrence.create({
            latitude: data.coordinates.latitude,
            longitude: data.coordinates.longitude,
            h3_index: h3Index,
            description: data.description,
            criticity_level: data.criticity_level,
            category_name: data.category_name,
            user_id: 1
        })

        for (const photo of data.resources.photos) {
            await Resource.create({ url: photo, type: 'photo', occurrence_id: occurrence.id })
        }

        if (data.resources.video) {
            await Resource.create({ url: data.resources.video, type: 'video', occurrence_id: occurrence.id })
        }

        if (data.resources.audio) {
            await Resource.create({ url: data.resources.audio, type: 'audio', occurrence_id: occurrence.id })
        }

        return { success: true, data: occurrence }
    }
}

module.exports = OccurrenceController
