import sendGrid from '@sendgrid/mail';

sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = class Email {
    constructor(fields, attachments) {
        this.to = process.env.GMAIL_FROM;
        this.from = {
            email: process.env.GMAIL_FROM,
            name: `${fields?.firstname} ${fields?.lastname}`
        };
        this.subject = `New contact form Submission from ${fields?.firstname} ${fields?.lastname}`;
        this.html = `
            <p>You have a new contact form submission from ${fields?.firstname} ${fields?.lastname}.</p><br>
            <p><strong>Firstname: </strong> ${fields?.firstname} </p><br>
            <p><strong>Lastname: </strong> ${fields?.lastname} </p><br>
            <p><strong>Email: </strong> ${fields?.email} </p><br>
        `;
        this.attachments = attachments;
    }

    async send() {
        const mailOptions = {
            to: this.to,
            from: {
                ...this.from
            },
            subject: this.subject,
            html: this.html,
            attachments: this.attachments
        }

        await sendGrid.send(mailOptions);
    }
}