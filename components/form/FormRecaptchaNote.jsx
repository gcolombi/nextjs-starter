export default function FormRecaptchaNote() {
    return (
        <>
            {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY &&
                <div className="o-wysiwyg">
                    <p><small>This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" title="Privacy Policy">Privacy Policy</a> and <a href="https://policies.google.com/terms" title="Terms of Service">Terms of Service</a> apply.</small></p>
                </div>
            }
        </>
    );
}