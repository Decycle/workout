import { Pie } from 'react-chartjs-2'

const PieChart = ({ input }) => {
  console.log(input)

  const data = {
    labels: input.labels,
    datasets: [
      {
        data: input.data,
        backgroundColor: ['#3aa3e9', '#eec868', '#ef718c'],
        hoverBackgroundColor: [
          '#33adff',
          '#FFCE56',
          '#FF6384',
        ],
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
