const { batSharp } = require('bat-sharp');

batSharp({
  inputArr: ['./manim/avatar/*'],
  format: 'webp', // png jpeg webp avif and so on
  outputPath: './images2/',
  outputConfig: { // docs: https://sharp.pixelplumbing.com/api-output#png
    quality: 60,
  },
})
