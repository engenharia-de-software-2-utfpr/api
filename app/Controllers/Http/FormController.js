'use strict'

const Form = use('App/Models/Form')

const Logger = use('Logger')

class FormController {
    async create({ request }) {

        const data = request.all()

        const form = await Form.findOrCreate({
            title: data.title,
            url: data.url,
            active: true,
        })

        return { success: true, message: 'form created', data: form }

    }

    async retrieve({ request, params }) {
        const form = await Form.find(params.id)

        if (!form) return { success: false, message: 'form not found', data: null}

        return { success: true, message: "form found", data: form }

    }

    async update({ request }) {

        const data = request.all()

        const form = await Form.find(data.id)

        if (!form) return { success: false, message: 'form not updated', data: null }
        
        form.title = data.title
        form.url = data.url
        form.active = data.active

        await form.save()

        return { success: true, message: 'form updated', data: form }

    }

    async delete({ request, params }) {

        const form = await Form.find(params.id)

        if (!form) return { success: false, message: 'form not removed', data: null }

        await form.delete()

        return { success: true, message: 'form removed', data: form }

    }

    async actived({ request }) {

        const forms = await Form
            .query()
            .where('active', true)
            .fetch()

        if (!forms) return { success: false, message: 'forms not available', data: null}

        return { success: true, message: 'forms found', data: forms }

    }

    async list({ request }) {

        const forms = await Form.all()

        if (!forms) return { success: false, message: 'forms not available', data: null }

        return { success: true, message: 'forms found', data: forms }

    }
}

module.exports = FormController
