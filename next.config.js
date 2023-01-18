/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    sassOptions: {
        additionalData: `
            @import
            'styles/settings/_config.scss',
            'styles/tools/mixins/_grid.scss',
            'styles/tools/mixins/_form.scss',
            'styles/tools/_functions.scss',
            'styles/objects/_mediaq.scss';
        `
    }
};