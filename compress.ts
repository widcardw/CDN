import { batSharp } from 'bat-sharp'

const path = './to_be_compressed/**/*.'
const suffix = [
  'jpg',
  'jpeg',
  'png'
]

batSharp({
  inputArr: suffix.map(s => path + s),
  format: 'webp', // png jpeg webp avif and so on
  outputPath: './pics_compressed',
  outputConfig: { // docs: https://sharp.pixelplumbing.com/api-output#png
    quality: 60,
  },
})
