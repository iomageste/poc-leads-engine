export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        lavender: {
          50: '#f8f5ff',
          100: '#f0e8ff',
          200: '#e0d0ff',
          300: '#d0b8ff',
          400: '#b88fff',
          500: '#a066ff',
          600: '#8844dd',
          700: '#6633bb',
          800: '#552299',
          900: '#441177',
        },
        neon: {
          green: '#39ff14',
          pink: '#ff10f0',
          cyan: '#00ffff',
          yellow: '#ffff00',
        },
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)', opacity: '1' },
          '50%': { transform: 'translateY(-20px)', opacity: '0.8' },
        },
        pulse_glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 16, 240, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 16, 240, 0.8)' },
        },
        slide_in: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        bounce_slow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        pulse_glow: 'pulse_glow 2s ease-in-out infinite',
        slide_in: 'slide_in 0.6s ease-out',
        bounce_slow: 'bounce_slow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
