import { Pie } from 'react-chartjs-2'

const generateRandomColors = (num) => {
  const colors = []
  for (let i = 0; i < num; i++) {
    const randomColor = `rgba(${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, 0.6)`
    colors.push(randomColor)
  }
  return colors
}

const brightenColor = (color) => {
  const rgb = color
    .replace('rgba(', '')
    .replace(')', '')
    .split(',')
    .map((num) => parseInt(num))
  const brightened = rgb.map((num) => num + 50)
  return `rgba(${brightened.join(',')})`
}

const PieChart = ({ input }) => {
  console.log(input)

  const colorStyle = {
    backgroundColor: ['#3aa3e9', '#eec868', '#ef718c'],
    hoverBackgroundColor: ['#33adff', '#FFCE56', '#FF6384'],
  }

  const randomColors = generateRandomColors(
    input.labels.length
  )

  const randomColorStyle = {
    backgroundColor: randomColors,
    hoverBackgroundColor: randomColors.map((color) =>
      brightenColor(color)
    ),
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

  console.log(data)

  return (
    <div>
      <Pie data={data} />
    </div>
  )
}

export default PieChart
