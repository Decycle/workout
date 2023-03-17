import { Pie } from 'react-chartjs-2'

const PieChart = ({ input }) => {
  // console.log(input)

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

  // const options = {
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //       ticks: {
  //         stepSize: 1,
  //       },
  //     },
  //   },
  // }
  return (
    <div>
      <Pie data={data} />
    </div>
  )
}

export default PieChart
