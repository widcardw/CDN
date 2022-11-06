const { batSharp } = require('bat-sharp')

batSharp({
  inputArr: ['./**/*.png'],
  format: 'webp', // png jpeg webp avif and so on
  outputPath: './compressed',
  outputConfig: { // docs: https://sharp.pixelplumbing.com/api-output#png
    quality: 60,
  },
})
