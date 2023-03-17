import { Pie } from 'react-chartjs-2'

// Convert HSL values to RGB values
const hslToRgb = (h, s, l) => {
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  let r, g, b
  if (h >= 0 && h < 60) {
    r = c
    g = x
    b = 0
  } else if (h >= 60 && h < 120) {
    r = x
    g = c
    b = 0
  } else if (h >= 120 && h < 180) {
    r = 0
    g = c
    b = x
  } else if (h >= 180 && h < 240) {
    r = 0
    g = x
    b = c
  } else if (h >= 240 && h < 300) {
    r = x
    g = 0
    b = c
  } else {
    r = c
    g = 0
    b = x
  }
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ]
}

const rgbToHex = (r, g, b) => {
  return (
    '#' +
    r.toString(16).padStart(2, '0') +
    g.toString(16).padStart(2, '0') +
    b.toString(16).padStart(2, '0')
  )
}

const PieChart = ({ input }) => {
  const colorStyle = {
    backgroundColor: ['#3aa3e9', '#eec868', '#ef718c'],
    hoverBackgroundColor: ['#33adff', '#FFCE56', '#FF6384'],
  }

  const startingHues = input.labels.map((_, index) =>
    Math.floor(
      (index / input.labels.length) * 360 +
        Math.random() * 30
    )
  )

  const random = () => 0.7 + Math.random() * 0.1

  const colorsHex = startingHues.map((hue) =>
    rgbToHex(...hslToRgb(hue, random(), random() - 0.1))
  )

  const brightenedColorsHex = startingHues.map((hue) =>
    rgbToHex(...hslToRgb(hue, random(), random()))
  )

  const randomColorStyle = {
    backgroundColor: colorsHex,
    hoverBackgroundColor: brightenedColorsHex,
  }

  const data = {
    labels: input.labels,
    datasets: [
      {
        data: input.data,
        ...(input.labels.length === 3
          ? colorStyle
          : randomColorStyle),
      },
    ],
  }

  return (
    <div>
      <Pie data={data} />
    </div>
  )
}

export default PieChart
