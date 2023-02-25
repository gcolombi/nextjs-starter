import { Writable } from 'stream';
import formidable, { errors as formidableErrors } from 'formidable';
import Email from '@/utils/email';
import { ValidationError } from 'yup';
import { careerSchema } from '@/schemas/career';
const fs = require("fs");

/**
 * Config
 *
 * https://nextjs.org/docs/api-routes/request-helpers
 * https://github.com/node-formidable/formidable#options
 */
export const config = {
    api: {
        bodyParser: false
    }
};

const formidableConfig = {
    keepExtensions: true,
    // maxFileSize: 4 * 1024 * 1024
};

/**
 * Helpers
 *
 * https://github.com/node-formidable/formidable
 */
function formidablePromise(req, opts) {
    return new Promise((resolve, reject) => {
        const form = formidable(opts);

        form.parse(req, (err, fields, files) => {
            if (err) {
                return reject(err);
            }

            return resolve({ fields, files });
        });
    });
}

const fileConsumer = (file, filesData) => {
    const chunks = [];

    const writable = new Writable({
        write (chunk, _enc, next) {
            chunks.push(chunk);

            next();
        },
        final(cb) {
            const buffer = Buffer.concat(chunks);
            filesData[file.originalFilename] = buffer;
            cb();
        },
    })
    return writable;
};

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
        // const chunks = [];
        let endBuffers = {};
        const filesData = {};

        // const { fields, files } = await formidablePromise(req, {
        //     ...formidableConfig,
        //     /* Consumes this, otherwise formidable tries to save the file to disk */
        //     // fileWriteStreamHandler: () => fileConsumer(chunks)
        // });

        const { fields, files } = await formidablePromise(req, {
            ...formidableConfig,
            fileWriteStreamHandler: (file) => fileConsumer(file, filesData)

            // fileWriteStreamHandler: (file) => {
            //     console.log('here file');
            //     console.log(file);
            //     const chunks = [];

            //     const writable = new Writable({
            //         write (chunk, enc, next) {
            //             chunks.push(chunk);

            //             next();
            //         },
            //         // destroy() {
            //         //     endBuffers = {};
            //         // },
            //         final(cb) {
            //             const buffer = Buffer.concat(chunks);
            //             /* if filename option is not provided filename will be a random string */
            //             // endBuffers[file.originalFilename] = buffer;
            //             // filesData.push(endBuffers);
            //             filesData.push({
            //                 [file.originalFilename]: buffer
            //             });
            //             cb();
            //         },
            //     })
            //     return writable;
            // }
        });

        console.log(filesData);

        // const { fields, files } = await formidablePromise(req);

        // console.log(files);

        /* Destructuring fiedls */
        const { recaptchaToken, labels, ...formFields } = fields;

        // console.log(recaptchaToken);
        // console.log(JSON.parse(labels));
        // console.log(formFields);

        /* Validation */
        await careerSchema.validate({ ...formFields, ...files }, { abortEarly: false });
        // await careerSchema.validate({ ...fields, ...files }, { abortEarly: false });

        /* Files */
        // const { resume, letter } = files;

        const attachments = [];

        // for (const key in files) {
        //     const fileData = Buffer.concat(chunks).toString('base64');
        //     // console.log(fileData);
        //     const filename = files[key]?.originalFilename;
        //     attachments.push({ content: fileData, filename })
        //     // attachments.push({ content: files[key], filename })
        // }


        // for (const filename in filesData) {
        //     console.log(filesData[filename]);
        //     // const fileData = Buffer.concat(chunks).toString('base64');
        //     // const filename = files[key]?.originalFilename;
        //     attachments.push({ content: filesData[filename].toString('base64'), filename })
        //     // attachments.push({ content: files[key], filename })
        // }

        Object.entries(filesData).forEach(([key, value]) => {
            attachments.push({ content: value.toString('base64'), filename: key });
        });

        console.log(attachments);

        // return;

        // const fileData = Buffer.concat(chunks).toString('base64');
        // const filename = resume?.originalFilename;

        // const attachments = fileData.length ? [{ content: fileData, filename }] : [];

        /* Sends email */
        try {
            await new Email(req.headers.host, 'New career form', JSON.parse(labels), formFields, attachments).send();
            // await new Email(req.headers.host, 'New career form', labels, fields, attachments).send();

            return res.status(201).json({
                data: {
                    formFields,
                    attachments
                },
                // data: {
                //     fields,
                //     attachments
                // },
                message: 'Thank you, your message has been sent successfully.'
            });
        } catch (err) {
            return res.status(500).json({ data: null, message: 'An error occurred while sending the email' });
        }

    } catch (err) {
        if (err instanceof formidableErrors.FormidableError) {
            let message = 'An error has occurred';

            /* Form data validation is done by yup */

            /* Checks specific formidable error according to the object's configuration */
            // if (err.code === formidableErrors.biggerThanMaxFileSize) {
            //     message = 'Max file size 4MB exceeded';
            // }

            return res.status(err.httpCode || 400).json({ data: null, message });
        }

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