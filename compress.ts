import { batSharp } from 'bat-sharp'

batSharp({
  inputArr: ['./source/**/*.jpg'],
  format: 'webp', // png jpeg webp avif and so on
  outputPath: './compressed',
  outputConfig: { // docs: https://sharp.pixelplumbing.com/api-output#png
    quality: 60,
  },
})
