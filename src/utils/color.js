const hexToRgbValue = (hex) => {
  const r = parseInt(hex.substring(1, 3), 16)
  const g = parseInt(hex.substring(3, 5), 16)
  const b = parseInt(hex.substring(5, 7), 16)
  return [r, g, b]
}

const rgbToRgbValue = (rgb) => {
  return rgb.split('(')[1].split(')')[0].split(',')
}

const hslToRgbValue = (h, s, l) => {
  let r, g, b
  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const hueToRgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hueToRgb(p, q, h + 1 / 3)
    g = hueToRgb(p, q, h)
    b = hueToRgb(p, q, h - 1 / 3)
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

const luminanace = (r, g, b) => {
  const a = [r, g, b].map((v) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]
}

const contrastColorTextScore = (color) => {
  let rgbValue = []
  switch (true) {
    case color.indexOf('hsl') === 0:
      rgbValue = hslToRgbValue(
        ...color
          .substring(4, color.length - 1)
          .split(',')
          .map((c) => parseFloat(c))
      )
      break
    case /^#[0-9A-F]{6}$/i.test(color):
      rgbValue = hexToRgbValue(color)
      break
    default:
      rgbValue = rgbToRgbValue(color)
      break
  }
  const l = luminanace(rgbValue[0], rgbValue[1], rgbValue[2])
  const lText = 0 // rgb(0, 0, 0)
  const ratio = (lText + 0.05) / (l + 0.05)
  if (ratio < 1 / 7) {
    return 'rgb(0, 0, 0)'
  }
  return 'rgb(255, 255, 255)'
}

export default contrastColorTextScore
