
import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Shop Palette ("Stenger Bike" - Tech/Sporty)
                shop: {
                    primary: '#E82525', // Racing Red
                    text: '#111827',    // Gray 900
                    subtext: '#4B5563', // Gray 600
                    bg: '#FFFFFF',
                    bgSecondary: '#F3F4F6', // Gray 100
                },
                // Travel Palette ("Adams & Butler" - Luxury/Earthy)
                travel: {
                    primary: '#1C1917', // Stone 900 (Dark Charcoal)
                    accent: '#A8A29E',  // Stone 400
                    text: '#292524',    // Stone 800
                    bg: '#FAFAF9',      // Stone 50
                    cream: '#F5F5F4',   // Stone 100
                },
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                serif: ['Garamond', 'Times New Roman', 'ui-serif', 'serif'],
            },
        },
    },
    plugins: [],
}
export default config
