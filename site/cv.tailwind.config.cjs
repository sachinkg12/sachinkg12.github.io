// Compile only when the approved CV's utility classes change.
module.exports = {
  content: ['./site/cv.html'],
  theme: {
    extend: {
      colors: { ink: '#202020', muted: '#626262', line: '#e5e5e5', forest: '#24583b', yellow: '#f3ce65', leaf: '#dce7b0' },
      fontFamily: { sans: ['IBM Plex Sans', 'Arial', 'sans-serif'], display: ['Arial', 'Helvetica', 'sans-serif'], serif: ['Lora', 'Georgia', 'serif'] }
    }
  },
  plugins: []
};
