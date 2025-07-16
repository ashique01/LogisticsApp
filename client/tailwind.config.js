/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        // Keyframes for the bounce-once animation
        bounceOnce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '20%': { transform: 'translateY(-5px)' },
          '40%': { transform: 'translateY(0)' },
          '60%': { transform: 'translateY(-2px)' },
        },
        // Keyframes for the fade-in animation
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        // Keyframes for the fade-in-down animation (used in Hero Banner)
        fadeInDown: {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        // Keyframes for the fade-in-up animation (used in Hero Banner and CTA)
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        // Keyframes for the scale-in animation (used in CTA icon)
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.8)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        // Animation utility for bounce-once
        'bounce-once': 'bounceOnce 1.5s ease-in-out',
        // Animation utility for fade-in
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        // Animation utility for fade-in-down
        'fade-in-down': 'fadeInDown 1s ease-out forwards',
        // Animation utility for fade-in-up
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        // Animation utility for scale-in
        'scale-in': 'scaleIn 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
};
