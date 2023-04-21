import html2pdf from 'html2pdf.js'

export default defineNuxtPlugin(() => {

    return {
        provide: {
            html2pdf: (element, options) => {
                return html2pdf().set(options)
                    .from(element)
                    .then(() => { })
                    .save();
            }
        }
    }
})