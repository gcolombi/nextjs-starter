import { Writable } from 'stream';
import formidable, { errors as formidableErrors } from 'formidable';
import Email from '../../utils/email';

/**
 * Config
 */
export const config = {
    api: {
        bodyParser: false
    }
};

const formidableConfig = {
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024,
    // maxFieldsSize: 0,
    // maxFields: 0,
    // multiples: false,
};

/**
 * Helpers
 */
function formidablePromise(req, opts) {
    return new Promise((resolve, reject) => {
        const form = formidable(opts);

        form.parse(req, (err, fields, files) => {
            if (err) {
                return reject(err);
            }

            /* Testing purpose */
            // return resolve({});

            return resolve({ fields, files });
        });
    });
}

const fileConsumer = (acc) => {
    const writable = new Writable({
        write: (chunk, _encoding, next) => {
            acc.push(chunk);
            next();
        }
    });

    return writable;
};

/**
 * Handler
 */
export default async function handler(req, res) {
    const fetchResponse = await fetch('http://localhost:3000/404');
    const notFoundPage = await fetchResponse.text();

    /* Returns 404 page if request method isn't equal to POST, you can use end() instead of send(notFoundPage) */
    if (req.method !== 'POST') return res.status(404).send(notFoundPage);

    try {
        const chunks = [];

        const { fields, files } = await formidablePromise(req, {
            ...formidableConfig,
            /* Consumes this, otherwise formidable tries to save the file to disk */
            fileWriteStreamHandler: () => fileConsumer(chunks),
        });

        /* Fields */
        // const { firstname, lastname, email, subject, choices, question, message } = fields;

        /* Files */
        const { resume } = files;
        const fileData = Buffer.concat(chunks).toString('base64');
        const filename = resume?.originalFilename;

        const attachments = fileData.length && filename ? [{ content: fileData, filename }] : [];

        /* Testing purpose */
        console.log({
            attachments,
            fields,
        });

        /* Sends email */
        try {
            await new Email(req.headers.host, fields, attachments).send();
            // const test = new Email(req.headers.host, fields, attachments);
            // console.log(test);
            // await test.send();

            return res.status(201).json({
                data: {
                    fields,
                    attachments
                },
                message: 'Thank you, your message has been sent successfully.'
            });
        } catch (err) {
            return res.status(500).json({ data: null, message: 'An error occurred while sending the email' });
        }

    } catch (err) {
        if (err instanceof formidableErrors.FormidableError) {
            let message = 'An error has occurred';

            /* Checks specific formidable error according to the object's configuration */
            if (err.code === formidableErrors.biggerThanMaxFileSize) {
                message = 'Max file size 5MB exceeded';
            }

            return res.status(err.httpCode || 400).json({ data: null, message });
        } else {
            return res.status(500).json({ data: null, message: 'Internal Server Error' });
        }
    }
}