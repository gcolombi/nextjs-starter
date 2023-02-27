import Email from '@/utils/email';
import { ValidationError } from 'yup';
import { contactSchema } from '@/schemas/contact';
import { validateRecaptcha } from '@/utils/recaptcha';

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
        /* Destructures body */
        const { recaptchaToken, labels, data } = req.body;

        /* Validation */
        await contactSchema.validate({ ...data }, { abortEarly: false })

        /* Recaptcha */
        const validReCaptcha = await validateRecaptcha(recaptchaToken, res);

        if (validReCaptcha)
            /* Sends email */
            try {
                await new Email(req.headers.host, 'New contact form', labels, data, []).send();

                return res.status(201).json({
                    data,
                    message: 'Thank you, your message has been sent successfully.'
                });
            } catch (err) {
                console.log(err);
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