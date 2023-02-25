import formidable from 'formidable';
import { Writable } from 'stream';

const formidableConfig = {
    keepExtensions: true,
    // maxFileSize: 4 * 1024 * 1024
};

const fileConsumer = (acc) => {
    const writable = new Writable({
        write: (chunk, _encoding, next) => {
            acc.push(chunk);
            next();
        }
    });

    return writable;
};

export const parseForm = async (req) => {
    return new Promise((resolve, reject) => {
        const chunks = [];

        const form = formidable({
            ...formidableConfig,
            /* Consumes this, otherwise formidable tries to save the file to disk */
            fileWriteStreamHandler: () => fileConsumer(chunks)
        })

        form.parse(req, (err, fields, files) => {
            if (err) {
                return reject(err);
            }

            return resolve({ fields, files });
        });
    });

}