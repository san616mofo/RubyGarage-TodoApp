module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false,
    theme: {
        extend: {
            fontFamily: {
                'raleway': ["Raleway"],
            },
            backgroundImage: {
                'img': "url('src/assets/texture.png')",
            },
            maxHeight: {
                '80vh': '80vh',
            },
            minHeight: {
                '750px': '750px',
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}