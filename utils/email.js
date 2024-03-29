import sendGrid from '@sendgrid/mail';

sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Documentation
 *
 * https://docs.sendgrid.com/api-reference/how-to-use-the-sendgrid-v3-api/authentication
 */

module.exports = class Email {
    constructor(template, subject, labels, fields, attachments) {
        this.siteName = process.env.NEXT_PUBLIC_SITE_NAME;
        this.host = process.env.NEXT_PUBLIC_BASE_URL;
        this.template = template;
        this.labels = labels
        this.fields = fields;
        this.to = process.env.EMAIL_FROM;
        this.from = {
            email: process.env.EMAIL_FROM,
            name: `${fields?.firstname} ${fields?.lastname}`
        };
        this.subject = subject;
        this.attachments = attachments;
    }

    /**
     * Sends the email with sendgrid
     */
    async send() {
        const mailOptions = {
            to: this.to,
            from: {
                ...this.from
            },
            subject: this.subject,
            ...this.generateTemplate(),
            attachments: this.attachments
        }

        await sendGrid.send(mailOptions);
    }

    /**
     * Generates email template
     * @returns {Object} an object containing the email template
     */
    generateTemplate() {
        const content = Object.entries(this.fields).reduce((str, [key, value]) => {
            return (str += `<p style="margin: .4em 0 1.1875em; font-size: 16px; line-height: 1.625; color: #51545E;"><strong>${this.labels?.[key]}: </strong>${value}</p>`);
        }, '');

        this.template = this.template
        .replaceAll('%SITENAME%', this.siteName)
        .replaceAll('%HOST%', this.host)
        .replace('%CONTENT%', content)
        .replace('%YEAR%', new Date().getFullYear());

        return {
            html: this.template
        };
    }
}