// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    if (req.method === 'POST') {

        console.log(req.body);

        const { firstname, lastname, email, resume, subject, choices, question, message } = req.body;

        const obj = {
            firstname,
            lastname,
            email,
            resume,
            subject,
            choices,
            question,
            message
        }

        res.status(201).json({ message: 'Thank you, your message has been sent successfully.', message: obj });
    }
}