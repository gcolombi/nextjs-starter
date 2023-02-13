import { Writable } from 'stream';
import formidable, { errors as formidableErrors } from 'formidable';

import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export const config = {
    api: {
        bodyParser: false,
    }
};

const formidableConfig = {
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024,
    // maxFieldsSize: 10_000_000,
    // maxFields: 0,
    // multiples: false,
};

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

const fileConsumer = (acc) => {
    const writable = new Writable({
        write: (chunk, _encoding, next) => {
            acc.push(chunk);
            next();
        }
    });

    return writable;
};

export default async function handler(req, res) {
    const fetchResponse = await fetch('http://localhost:3000/404');
    const notFoundPage = await fetchResponse.text();

    /* Return 404 page if request method isn't equal to POST, you can use end() instead of send(notFoundPage) */
    if (req.method !== 'POST') return res.status(404).send(notFoundPage);


    try {
        const chunks = [];

        const { fields, files } = await formidablePromise(req, {
            ...formidableConfig,
            /* consumes this, otherwise formidable tries to save the file to disk */
            fileWriteStreamHandler: () => fileConsumer(chunks),
        });

        /* Fields */
        const { firstname, lastname, email, subject, choices, question, message } = fields;

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
            const emailRes = await sendgrid.send({
                to: process.env.GMAIL_FROM,
                from: `${firstname} ${lastname} <${process.env.GMAIL_FROM}>`,
                subject: `Contact Form Submission from ${firstname} ${lastname}`,
                html: `
                    <p>You have a new contact form submission from ${firstname} ${lastname}.</p><br>
                    <p><strong>Firstname: </strong> ${firstname} </p><br>
                    <p><strong>Lastname: </strong> ${lastname} </p><br>
                    <p><strong>Email: </strong> ${email} </p><br>
                `,
                attachments,
            });

            console.log('Message Sent', emailRes);
            return res.status(201).json({ message: 'Thank you, your message has been sent successfully.'});
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'An error occurred while sending the email' });
        }

    } catch (err) {
        if (err instanceof formidableErrors.FormidableError) {
            console.log('instance FormidableError');
            let message = 'An error has occurred';

            /* checks specific formidable error according to the object's configuration */
            if (err.code === formidableErrors.biggerThanMaxFileSize) {
                message = 'Max file size 5MB exceeded';
            }

            return res.status(err.httpCode || 400).json({ data: null, message });
        } else {
            console.log('Server Error');
            return res.status(500).json({ data: null, message: 'Internal Server Error' });
        }
    }
}