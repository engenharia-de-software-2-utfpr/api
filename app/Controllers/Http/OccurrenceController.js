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

        const medias = [
            {
                type: 'video',
                url: 'https://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwjkl_yPtZjmAhUYILkGHXw_BqcQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.brandeps.com%2Ficon%2FV%2FVideo-clip-01&psig=AOvVaw0rLDr-CxWtgj890OogGjWu&ust=1575425821450078'
            },
            {
                type: 'photo',
                url: 'https://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwio9Oa5t5jmAhU1H7kGHcsAD2EQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.union.edu%2Fschaffer-library%2Fstaff-departments%2Fsarah-kirby&psig=AOvVaw3WH6-B3IHO2OXUy_Znwx7h&ust=1575425837448402'
            },
            {
                type: 'audio',
                url: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwivrI_ht5jmAhV4GLkGHfW6A9oQjRx6BAgBEAQ&url=https%3A%2F%2Fpngtree.com%2Fso%2Faudio-icon&psig=AOvVaw0txBUvD9SfMd_ckZ7MsXbY&ust=1575426613031783'
            },
        ]
        
        occurrence.medias = medias

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
            const fileName = uuid.v4() + '.mp4'
            const url = await Firebase.generateUrl(fileName)

            await Resource.create({ name: fileName, type: 'video', occurrence_id: occurrence.id })

            response.videos.push(url)
        }


        for (let index = 0; index < data.num_audios; index++) {
            const fileName = uuid.v4() + '.aac'
            const url = await Firebase.generateUrl(fileName)

            await Resource.create({ name: fileName, type: 'audio', occurrence_id: occurrence.id })

            response.audios.push(url)
        }

        return { success: true, message: "occurrence created", data: response }
    }
}

module.exports = OccurrenceController
