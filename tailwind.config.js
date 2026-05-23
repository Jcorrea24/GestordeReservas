/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#fdf6ee',
                    100: '#faebd7',
                    500: '#c8853a',
                    600: '#a8692a',
                    700: '#8a5220',
                    900: '#3d2008',
                }
            }
        },
    },
    plugins: [],
}