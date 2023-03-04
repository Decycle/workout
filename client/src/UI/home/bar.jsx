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

const BarChart = () => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Workout',
        data: labels.map(() => faker.datatype.number(100)),
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'transparent',
      },
    ],
  }

  const options = {}

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  )
}

export default BarChart
