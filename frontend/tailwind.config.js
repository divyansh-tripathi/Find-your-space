/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--bg-dark)",
                foreground: "var(--text-main)",
                primary: {
                    DEFAULT: "var(--primary)",
                    glow: "var(--primary-glow)",
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                },
                muted: {
                    foreground: "var(--text-muted)",
                },
                border: "var(--glass-border)",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    plugins: [],
}
