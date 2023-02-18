import sendGrid from '@sendgrid/mail';

sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = class Email {
    constructor(host, subject, fields, attachments) {
        this.siteName = process.env.SITE_NAME;
        this.host = host;
        this.fields = fields;
        this.to = process.env.GMAIL_FROM;
        this.from = {
            email: process.env.GMAIL_FROM,
            name: `${fields?.firstname} ${fields?.lastname}`
        };
        this.subject = subject;
        this.attachments = attachments;
    }

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

    generateContent() {
        return Object.entries(this.fields).reduce((str, [key, value]) => {
            return (str += `<p style="margin: .4em 0 1.1875em; font-size: 16px; line-height: 1.625; color: #51545E;"><strong>${key} : </strong>${value}</p>`);
        }, '');
    }

    generateTemplate() {
        return {
            html: `
                <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml" style="color-scheme: light dark; supported-color-schemes: light dark;">
                    <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <meta name="x-apple-disable-message-reformatting">
                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                        <meta name="color-scheme" content="light dark">
                        <meta name="supported-color-schemes" content="light dark">
                        <title>${this.siteName}</title>
                        <style type="text/css" rel="stylesheet" media="all">

                            /* Base */

                            @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");

                            body {
                                width: 100% !important;
                                height: 100%;
                                margin: 0;
                                -webkit-text-size-adjust: none;
                            }

                            a {
                                color: #3869D4;
                            }

                            a img {
                                border: none;
                            }

                            td {
                                word-break: break-word;
                            }

                            /* Type */

                            body,
                            td,
                            th {
                                font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
                            }

                            h1 {
                                margin-top: 0;
                                color: #333333;
                                font-size: 22px;
                                font-weight: bold;
                                text-align: left;
                            }

                            h2 {
                                margin-top: 0;
                                color: #333333;
                                font-size: 16px;
                                font-weight: bold;
                                text-align: left;
                            }

                            h3 {
                                margin-top: 0;
                                color: #333333;
                                font-size: 14px;
                                font-weight: bold;
                                text-align: left;
                            }

                            td,
                            th {
                                font-size: 16px;
                            }

                            p,
                            ul,
                            ol,
                            blockquote {
                                margin: .4em 0 1.1875em;
                                font-size: 16px;
                                line-height: 1.625;
                            }

                            p.sub {
                                font-size: 14px;
                            }

                            /* Utilities */

                            .align-right {
                                text-align: right;
                            }

                            .align-left {
                                text-align: left;
                            }

                            .align-center {
                                text-align: center;
                            }

                            .u-margin-none {
                                margin: 0;
                            }

                            .u-margin-bottom-none {
                                margin-bottom: 0;
                            }

                            /* Data table */

                            body {
                                background-color: #EDE9F3;
                                color: #51545E;
                            }

                            p {
                                color: #51545E;
                            }

                            .email-wrapper {
                                width: 100%;
                                margin: 0;
                                padding: 0;
                                -premailer-width: 100%;
                                -premailer-cellpadding: 0;
                                -premailer-cellspacing: 0;
                                background-color: #EDE9F3;
                            }

                            .email-content {
                                padding: 45px 0 0;
                                width: 100%;
                                margin: 0;
                                -premailer-width: 100%;
                                -premailer-cellpadding: 0;
                                -premailer-cellspacing: 0;
                            }

                            /* Logo */

                            .logo{
                                text-align:center;
                                margin-bottom: 45px;
                                padding-bottom: 45px;
                                border-bottom: 1px solid #EAEAEC;
                            }
                            .logo img{
                                text-align:center;
                                margin: 0;
                                padding: 0;
                                width:219px;
                                -ms-interpolation-mode: bicubic;
                                font-family: Helvetica, Arial, sans-serif;
                            }

                            /* Body */

                            .email-body {
                                width: 100%;
                                margin: 0;
                                padding: 0;
                                -premailer-width: 100%;
                                -premailer-cellpadding: 0;
                                -premailer-cellspacing: 0;
                            }

                            .email-body_inner {
                                width: 570px;
                                margin: 0 auto;
                                padding: 0;
                                -premailer-width: 570px;
                                -premailer-cellpadding: 0;
                                -premailer-cellspacing: 0;
                                background-color: #FFFFFF;
                            }

                            .email-footer {
                                width: 570px;
                                margin: 0 auto;
                                padding: 0;
                                -premailer-width: 570px;
                                -premailer-cellpadding: 0;
                                -premailer-cellspacing: 0;
                                text-align: center;
                            }

                            .email-footer p {
                                color: #6C757D;
                            }

                            .content-cell {
                                padding: 45px;
                            }

                            /* Media Queries */

                            @media only screen and (max-width: 600px) {

                                .email-body_inner,
                                .email-footer {
                                    width: 100% !important;
                                }
                            }

                            @media (prefers-color-scheme: dark) {

                                .email-body_inner {
                                    background-color: #333333 !important;
                                }

                                .email-footer p {
                                    color: #6C757D !important;
                                }

                                p,
                                ul,
                                ol,
                                blockquote,
                                h1,
                                h2,
                                h3,
                                span {
                                    color: #FFF !important;
                                }
                            }

                            :root {
                                color-scheme: light dark;
                                supported-color-schemes: light dark;
                            }
                        </style>
                        <!-- [if mso]>
                        <style type="text/css">
                        .f-fallback  {
                            font-family: Arial, sans-serif;
                        }
                        </style>
                    <![endif] -->
                    </head>
                    <body style="width: 100%; height: 100%; margin: 0; -webkit-text-size-adjust: none; font-family: 'Nunito Sans', Helvetica, Arial, sans-serif; background-color: #EDE9F3; color: #51545E;">
                        <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%; margin: 0; padding: 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0; background-color: #EDE9F3;" bgcolor="#EDE9F3">
                            <tr>
                                <td align="center" style="word-break: break-word; font-family: 'Nunito Sans', Helvetica, Arial, sans-serif; font-size: 16px;">
                                    <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="padding: 45px 0 0; width: 100%; margin: 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0;">
                                        <!-- Email Body -->
                                        <tr>
                                            <td class="email-body" width="100%" cellpadding="0" cellspacing="0" style="word-break: break-word; font-family: 'Nunito Sans', Helvetica, Arial, sans-serif; font-size: 16px; width: 100%; margin: 0; padding: 0; -premailer-width: 100%; -premailer-cellpadding: 0; -premailer-cellspacing: 0;">
                                                <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation" style="width: 570px; margin: 0 auto; padding: 0; -premailer-width: 570px; -premailer-cellpadding: 0; -premailer-cellspacing: 0; background-color: #FFFFFF;" bgcolor="#FFFFFF">
                                                    <!-- Body content -->
                                                    <tr>
                                                        <td class="content-cell" style="word-break: break-word; font-family: 'Nunito Sans', Helvetica, Arial, sans-serif; font-size: 16px; padding: 45px;">
                                                            <div class="logo" style="text-align: center; margin-bottom: 45px; padding-bottom: 45px; border-bottom: 1px solid #EAEAEC;">
                                                                <a href="http://${this.host}" target="_blank" mc:edit="logo" style="color: #3869D4;"><img src="http://${this.host}/static/example.jpg" alt="Logo" border="0" style="border: none; text-align: center; margin: 0; padding: 0; width: 219px; -ms-interpolation-mode: bicubic; font-family: Helvetica, Arial, sans-serif;" width="219"></a>
                                                            </div>
                                                            <div class="f-fallback">
                                                                ${this.generateContent()}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <!-- Email Footer -->
                                        <tr>
                                            <td style="word-break: break-word; font-family: 'Nunito Sans', Helvetica, Arial, sans-serif; font-size: 16px;">
                                                <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation" style="width: 570px; margin: 0 auto; padding: 0; -premailer-width: 570px; -premailer-cellpadding: 0; -premailer-cellspacing: 0; text-align: center;">
                                                    <tr>
                                                        <td class="content-cell" align="center" style="word-break: break-word; font-family: 'Nunito Sans', Helvetica, Arial, sans-serif; font-size: 16px; padding: 45px;">
                                                            <p class="f-fallback sub align-center u-margin-none" style="margin: .4em 0 1.1875em; line-height: 1.625; text-align: center; font-size: 14px; color: #6C757D; margin: 0;">
                                                                &copy; 2023 Next.js starter - All rights reserved
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </body>
                </html>
            `
        };
    }
}