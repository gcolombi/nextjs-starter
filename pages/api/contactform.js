import { Writable } from 'stream';
import formidable, { errors as formidableErrors } from 'formidable';
import Email from '@/utils/email';
import { ValidationError } from 'yup';
import { contactSchema } from '@/schemas/contact';
import { labels } from '@/components/form/ContactForm';

/**
 * Config
 *
 * https://nextjs.org/docs/api-routes/request-helpers
 * https://github.com/node-formidable/formidable#options
 */
// export const config = {
//     api: {
//         bodyParser: false
//     }
// };

// const formidableConfig = {
//     keepExtensions: true,
//     // maxFileSize: 4 * 1024 * 1024
// };

/**
 * Helpers
 *
 * https://github.com/node-formidable/formidable
 */
// function formidablePromise(req, opts) {
//     return new Promise((resolve, reject) => {
//         const form = formidable(opts);

//         form.parse(req, (err, fields, files) => {
//             if (err) {
//                 return reject(err);
//             }

//             return resolve({ fields, files });
//         });
//     });
// }

// const fileConsumer = (acc) => {
//     const writable = new Writable({
//         write: (chunk, _encoding, next) => {
//             acc.push(chunk);
//             next();
//         }
//     });

//     return writable;
// };

/**
 * Handler
 *
 * https://nextjs.org/docs/api-routes/introduction
 */
export default async function handler(req, res) {

    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method not allowed');
    }

    try {
        /* Fields */
        const fields = req.body;

        // const chunks = [];

        // const { fields, files } = await formidablePromise(req, {
        //     ...formidableConfig,
        //     /* Consumes this, otherwise formidable tries to save the file to disk */
        //     fileWriteStreamHandler: () => fileConsumer(chunks)
        // });

        /* Validation */
        await contactSchema.validate({ ...fields }, { abortEarly: false })

        /* Files */
        // const { resume } = files;
        // const fileData = Buffer.concat(chunks).toString('base64');
        // const filename = resume?.originalFilename;

        // const attachments = fileData.length && filename ? [{ content: fileData, filename }] : [];

        /* Sends email */
        try {
            await new Email(req.headers.host, 'New contact form', labels, fields, []).send();

            return res.status(201).json({
                data: {
                    fields
                },
                message: 'Thank you, your message has been sent successfully.'
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ data: null, message: 'An error occurred while sending the email' });
        }

    } catch (err) {
        // if (err instanceof formidableErrors.FormidableError) {
        //     let message = 'An error has occurred';

        //     /* Form data validation is done by yup */

        //     /* Checks specific formidable error according to the object's configuration */
        //     // if (err.code === formidableErrors.biggerThanMaxFileSize) {
        //     //     message = 'Max file size 4MB exceeded';
        //     // }

        //     return res.status(err.httpCode || 400).json({ data: null, message });
        // }

        if (err instanceof ValidationError) {
            let validationErrors = {}

            err.inner.forEach((error) => {
                if (!validationErrors[error.path])
                    validationErrors[error.path] = error.errors[0];
            });

            return res.status(400).json({ data: null, errors: validationErrors });
        }

        return res.status(500).json({ data: null, message: 'Internal Server Error' });
    }
}