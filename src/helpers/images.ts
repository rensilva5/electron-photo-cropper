import fs from 'fs'

export function readFile (file: any) {
  return new Promise ((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

