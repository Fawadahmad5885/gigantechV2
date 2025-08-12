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
        primaryColor: "#FF6D41",
        secondaryColor: "#0B74BF",
        tertiaryColor:"#ffc4b2",
        tertiary2Color:"#54b2f5",
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
      keyframes: {
        zoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' }, // change 1.2 to limit
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      animation: {
'rotate-loop': 'rotate 10s linear infinite',
},
    },
    
  },
  plugins: [require('@tailwindcss/typography')],
};
