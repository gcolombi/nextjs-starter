// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    if (req.method === 'POST') {

        const { firstname, lastname } = req.body;

        const message = {
            firstname,
            lastname
        }

        res.status(201).json({ message: 'Thank you, your message has been sent successfully.', message: message });
    }
}