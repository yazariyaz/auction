const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './resources/js/**/*.js',
    ],

    theme: {
        extend: {
            colors: {
                'gray-card-border': '#dadce0'
            },
            'dropShadow': {
                'header': '0 4px 13px rgba(0,0,0,.05)'
            },
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    /* plugins: [require('@tailwindcss/forms')], */
};
