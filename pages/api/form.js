// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Writable } from 'stream';
import formidable from 'formidable';
import nodemailer from 'nodemailer';

const formidableConfig = {
    keepExtensions: true,
    // maxFileSize: 10_000_000,
    // maxFieldsSize: 10_000_000,
    // maxFields: 0,
    // multiples: false,
};

export const config = {
    api: {
        bodyParser: false,
    }
};

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    }
});

function formidablePromise(req, opts) {
    return new Promise((accept, reject) => {
        const form = formidable(opts);

        form.parse(req, (err, fields, files) => {
            if (err) {
                return reject(err);
            }
            return accept({ fields, files });
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
            /* consume this, otherwise formidable tries to save the file to disk */
            fileWriteStreamHandler: () => fileConsumer(chunks),
        });

        /* Fields */
        const { firstname, lastname, email } = fields;

        /* Files */
        const { resume } = files;
        const fileData = Buffer.concat(chunks);
        const filename = resume?.originalFilename;

        const attachments = fileData.length && filename ? [{ content: fileData, filename }] : [];

        /* Testing purpose */
        console.log({
            attachments,
            fields,
        });

        /* Sends email */
        try {
            const emailRes = await transporter.sendMail({
                from: `${firstname} ${lastname} <${email}>`,
                to: process.env.GMAIL_USER,
                subject: `Contact Form Submission from ${firstname} ${lastname}`,
                html: `
                    <p>You have a new contact form submission from ${firstname} ${lastname}.</p><br>
                    <p><strong>Firstname: </strong> ${firstname} </p><br>
                    <p><strong>Lastname: </strong> ${lastname} </p><br>
                    <p><strong>Email: </strong> ${email} </p><br>
                `,
                attachments,
            });
            console.log('Message Sent', emailRes.messageId);

            res.status(201).json({ message: 'Thank you, your message has been sent successfully.'});
        } catch (error) {

            // @todo add res status

            console.log(error);
        }

    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}