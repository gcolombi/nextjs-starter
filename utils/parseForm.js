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

export const parseForm = async (req, opts) => {

}