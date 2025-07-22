/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: false,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#105085",
        secondaryColor: "#1e98cc",
        textColor: "#2E2E2E",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      typography: ({
        theme
      }) => ({
        DEFAULT: {
          css: {
            h1: {
              color: theme('colors.textColor'),
              fontSize: theme('fontSize.3xl'),
              fontWeight: theme('fontWeight.bold'),
              lineHeight: theme('lineHeight.tight'),
            },
            h2: {
              color: theme('colors.textColor'),
              fontSize: theme('fontSize.3xl'),
              fontWeight: theme('fontWeight.bold'),
              lineHeight: theme('lineHeight.tight'),
            },
            h3: {
              color: theme('colors.textColor'),
              fontSize: theme('fontSize.3xl'),
              fontWeight: theme('fontWeight.bold'),
              lineHeight: theme('lineHeight.tight'),
            },
            h4: {
              color: theme('colors.textColor'),
              fontSize: theme('fontSize.2xl'),
              fontWeight: theme('fontWeight.bold'),
              lineHeight: theme('lineHeight.tight'),
            },
            h5: {
              color: theme('colors.textColor'),
              fontSize: theme('fontSize.xl'),
              fontWeight: theme('fontWeight.bold'),
              lineHeight: theme('lineHeight.tight'),
            },
            h6: {
              color: theme('colors.textColor'),
              fontSize: theme('fontSize.xl'),
              fontWeight: theme('fontWeight.bold'),
              lineHeight: theme('lineHeight.tight'),
            },
            p: {
              color: theme('colors.gray.700'),
              fontSize: theme('fontSize.lg'),
              lineHeight: theme('lineHeight.relaxed'),
            },
            a: {
              color: theme('colors.primaryColor'),
              '&:hover': {
                color: theme('colors.secondaryColor'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
