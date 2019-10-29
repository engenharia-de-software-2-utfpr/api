'use strict'

const h3 = require('h3-js')
const uuid = require('uuid')

const Database = use('Database')
const Occurrence = use('App/Models/Occurrence')
const Resource = use('App/Models/Resource')
const OccurrenceCategory = use('App/Models/OccurrenceCategory')

const Firebase = use('Adonis/Services/Firebase')


class OccurrenceController {



    async details({ request, params }) {
        const occurrence = await Occurrence.find(params.id)

        if (!occurrence) return { success: false, message: "occurrence not found", data: null }

        return { success: true, message: "occurrence found", data: occurrence }
    }

    async near({ request }) {
        const data = request.only(['latitude', 'longitude'])

        const h3Index = h3.geoToH3(data.latitude, data.longitude, 7)
        if (!h3Index)
            return { success: false, message: "invalid coordinates", data: null }

        const kRing = h3.kRing(h3Index, 1);


        const occurrences = await Database
            .select('id', 'category_id', 'latitude', 'longitude')
            .from('occurrences')
            // .where('status', 'approved')
            .whereIn('h3_index', kRing)


        return { success: true, message: "occurrences found", data: occurrences }
    }


    async create({ request }) {
        const data = request.all()

        const category = await OccurrenceCategory.findByOrFail('id', data.category_id)


        const h3Index = h3.geoToH3(data.coordinates.latitude, data.coordinates.longitude, 7)
        if (!h3Index)
            return { success: false, message: "invalid coordinates", data: null }

        const occurrence = await Occurrence.create({
            latitude: data.coordinates.latitude,
            longitude: data.coordinates.longitude,
            h3_index: h3Index,
            description: data.description,
            criticity_level: data.criticity_level,
            category_id: data.category_id,
            user_id: request.user.id
        })


        const response = { ...occurrence.toJSON(), photos: [], videos: [], audios: [] }

        for (let index = 0; index < data.num_photos; index++) {
            const fileName = uuid.v4() + '.jpg'
            const url = await Firebase.generateUrl(fileName)

            await Resource.create({ name: fileName, type: 'photo', occurrence_id: occurrence.id })

            response.photos.push(url)
        }


        for (let index = 0; index < data.num_videos; index++) {
            const fileName = uuid.v4() + '.jpg'
            const url = await Firebase.generateUrl(fileName)

            await Resource.create({ name: fileName, type: 'video', occurrence_id: occurrence.id })

            response.videos.push(url)
        }


        for (let index = 0; index < data.num_audios; index++) {
            const fileName = uuid.v4() + '.jpg'
            const url = await Firebase.generateUrl(fileName)

            await Resource.create({ name: fileName, type: 'audio', occurrence_id: occurrence.id })

            response.audios.push(url)
        }

        return { success: true, message: "occurrence created", data: response }
    }
}

module.exports = OccurrenceController
