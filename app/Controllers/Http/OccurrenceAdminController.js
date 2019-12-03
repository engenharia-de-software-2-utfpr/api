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
}

module.exports = OccurrenceAdminController
