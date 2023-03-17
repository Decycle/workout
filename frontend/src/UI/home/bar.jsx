import { Bar } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const BarChart = ({ input }) => {
  console.log(input)

  const data = {
    labels: input.labels,
    datasets: [
      {
        label: 'Workout',
        data: input.data,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'transparent',
      },
    ],
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  }
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  )
}

export default BarChart
