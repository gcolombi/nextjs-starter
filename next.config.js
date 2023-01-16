// const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        // includePaths: [path.join(__dirname, 'styles')],
        // prependData: `@import "style.scss";`
        additionalData: `
            @import
            'styles/settings/_config.scss',
            'styles/tools/mixins/_grid.scss',
            'styles/tools/mixins/_form.scss',
            'styles/tools/_functions.scss',
            'styles/objects/_mediaq.scss';
        `
    }
}

module.exports = nextConfig;