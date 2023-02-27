import { Writable } from 'stream';
import formidable from 'formidable';
import Email from '@/utils/email';
import { ValidationError } from 'yup';
import { jobSchema } from '@/schemas/job';
import { validateRecaptcha } from '@/utils/recaptcha';

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
    keepExtensions: true
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
        const filesData = {};

        /* Parses form data */
        const { fields, files } = await formidablePromise(req, {
            ...formidableConfig,
            /* Consumes this, otherwise formidable tries to save the file to disk */
            fileWriteStreamHandler: (file) => fileConsumer(file, filesData)
        });

        /* Destructures fields */
        const { recaptchaToken, labels, ...formFields } = fields;

        /* Validation */
        await jobSchema.validate({ ...formFields, ...files }, { abortEarly: false });

        /* Builds attachments */
        const attachments = [];

        Object.entries(filesData).forEach(([key, value]) => {
            attachments.push({ content: value.toString('base64'), filename: key });
        });

        /* Recaptcha */
        const validReCaptcha = await validateRecaptcha(recaptchaToken, res);

        if (validReCaptcha)
            /* Sends email */
            try {
                await new Email(req.headers.host, 'New career form', JSON.parse(labels), formFields, attachments).send();

                return res.status(201).json({
                    data: {
                        formFields,
                        attachments
                    },
                    message: 'Thank you, your message has been sent successfully.'
                });
            } catch (err) {
                return res.status(500).json({ data: null, message: 'An error occurred while sending the email' });
            }

    } catch (err) {
        /* Yup validation */
        if (err instanceof ValidationError) {
            const validationErrors = {}

            err.inner.forEach((error) => {
                if (!validationErrors[error.path])
                    validationErrors[error.path] = error.errors[0];
            });

            return res.status(400).json({ data: null, errors: validationErrors });
        }
        /* Global server error */
        return res.status(500).json({ data: null, message: 'Internal Server Error' });
    }
}