function makeChart() {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    maintainAspectRatio: true,
    type: "horizontalBar",
    data: {
      labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      datasets: [
        {
          label: "# Probabilitiy",
          data: Array(10).fill(0),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(200, 20, 50, 0.2)",
            "rgba(100, 150, 50, 0.2)",
            "rgba(153, 90, 150, 0.2)",
            "rgba(20, 250, 100, 0.2)",
          ],
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
      animation: {
        duration: 0,
      },
      hover: {
        animationDuration: 0,
      },
      responsiveAnimationDuration: 0,
    },
  });
  return myChart;
}

function update_chart(chart, arr) {
  chart.data.datasets[0].data = arr;
  chart.update();
}
