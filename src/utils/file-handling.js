/**
 * gets the base64 from a file-input
 * @param data --> input.files[0]
 */
export function getBase64 (data) {
  return new Promise((resolve, reject) => {
    const filereader = new FileReader()
    if (data) {
      filereader.readAsDataURL(data)
    }
    filereader.onerror = () => {
      filereader.abort()
      reject(new DOMException('Problem parsing input file.'))
    }
    filereader.onloadend = function (ev) {
      if (ev.target.readyState === FileReader.DONE) {
        console.log((filereader.result.length / 1024).toFixed(2) + 'KB base64High filesize')
        console.log(filereader.result)
        resolve(filereader.result)
      }
    }
  })
}
/**
 * gets a low resolution version of the base64
 * @param data --> base64
 * @param width --> integer for img-width
 */
export function getLowResImage (data, width) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('IMG')
    img.src = data
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    img.onload = function () {
      canvas.width = width
      canvas.height = canvas.width * (img.height / img.width)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      img.src = canvas.toDataURL()
      resolve(img.src)
    }
    img.error = function () {
      reject(new DOMException('Problem parsing input file.'))
    }
    console.log('LowRes Base64: ', img.src)
  })
}
/**
 * image as grayscale
 */
export function getGrayscaleIMG (data) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('IMG')
    img.src = data
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    img.onload = function () {
      canvas.width = this.width
      canvas.height = this.height
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
        data[i] = avg // red
        data[i + 1] = avg // green
        data[i + 2] = avg // blue
      }
      ctx.putImageData(imageData, 0, 0)

      img.src = canvas.toDataURL()
      resolve(img.src)
    }
    img.error = function () {
      reject(new DOMException('Problem parsing input file.'))
    }
  })
}
/**
 * image as inverted
 */
export function getInvertedIMG (data) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('IMG')
    img.src = data
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    img.onload = function () {
      canvas.width = this.width
      canvas.height = this.height
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i] // red
        data[i + 1] = 255 - data[i + 1] // green
        data[i + 2] = 255 - data[i + 2] // blue
      }
      ctx.putImageData(imageData, 0, 0)
      ctx.putImageData(imageData, 0, 0)

      img.src = canvas.toDataURL()
      resolve(img.src)
    }
    img.error = function () {
      reject(new DOMException('Problem parsing input file.'))
    }
  })
}
/**
 * image as sepai
 */
export function getSepaiIMG (data) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('IMG')
    img.src = data
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    img.onload = function () {
      canvas.width = this.width
      canvas.height = this.height
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const red = data[i]
        const green = data[i + 1]
        const blue = data[i + 2]
        data[i] = 0.393 * (red) + 0.769 * (green) + 0.189 * (blue)
        data[i + 1] = 0.349 * (red) + 0.686 * (green) + 0.168 * (blue)
        data[i + 2] = 0.272 * (red) + 0.534 * (green) + 0.131 * (blue)
      }
      ctx.putImageData(imageData, 0, 0)

      img.src = canvas.toDataURL()
      resolve(img.src)
    }
    img.error = function () {
      reject(new DOMException('Problem parsing input file.'))
    }
  })
}
/**
 * gets the file-extension
 * @param file --> input.files[0]
 */
export function getFileExt (file) {
  if (file) {
    return new Promise((resolve, reject) => {
      console.log((file.size / 1024).toFixed(2) + 'KB effective filesize')
      const filereader = new FileReader()
      if (file) {
        const blob = file.slice(0, 4)
        filereader.readAsArrayBuffer(blob)
      }
      filereader.onerror = () => {
        filereader.abort()
        reject(new DOMException('Problem parsing input file.'))
      }
      filereader.onloadend = function (ev) {
        if (ev.target.readyState === FileReader.DONE) {
          resolve(filereader.result)
        }
      }
    })
  }
}
/**
 * checks for the correct file signature
 * @param ext --> present file signature
 * @param fileSignature --> array of possible fileSignatures
 */
export function checkImageSignatur (ext, fileSignature) {
  let isValid = false
  const uint = new Uint8Array(ext)
  const bytes = []
  uint.forEach((byte) => {
    bytes.push(byte.toString(16))
  })
  const hex = bytes.join('').toUpperCase()
  fileSignature.forEach(element => {
    if (element.length === 4) {
      if (hex.slice(0, 4) === element) {
        isValid = true
        return
      }
    }
    if (element === hex) {
      isValid = true
    }
  })
  return isValid
}
