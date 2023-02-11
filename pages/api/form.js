// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

    // if (req.method !== 'POST') {
    //     res.setHeader('Allow', 'POST');
    //     res.status(405).json({
    //         data: null,
    //         error: 'Method Not Allowed',
    //     });
    //     return;
    // }

    if (req.method !== 'POST') return res.status(404).end();

    console.log(req.body);

    // const { firstname, lastname, email, resume, subject, choices, question, message } = req.body;

    const obj = {

    }

    console.log(obj);

    res.status(201).json({ message: 'Thank you, your message has been sent successfully.', message: obj });
}

export const config = {
    api: {
        bodyParser: false,
    },
};