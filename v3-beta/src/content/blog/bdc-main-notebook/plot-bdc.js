import React from "react";
import { Bar, Pie } from "react-chartjs-2";

const PieChart = () => {
  const data = {
    labels: ["Bukan Hoax", "Hoax"],
    datasets: [
      {
        label: "Frekuensi",
        data: [765, 3463],
        backgroundColor: ["#0db7c5", "#d03850"],
      },
    ],
  };
  return (
    <div style={{ marginBottom: "32px" }}>
      <Pie
        style={{ minHeight: "400px" }}
        data={data}
        options={{
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Frekuensi per Kelasnya",
              font: {
                size: 20,
              },
            },
          },
          responsive: true,
        }}
      />
    </div>
  );
};

const BarChart = () => {
  const data = {
    labels: [
      "(2015, 7)",
      "(2015, 9)",
      "(2015, 10)",
      "(2015, 11)",
      "(2015, 12)",
      "(2016, 1)",
      "(2016, 2)",
      "(2016, 3)",
      "(2016, 4)",
      "(2016, 5)",
      "(2016, 6)",
      "(2016, 7)",
      "(2016, 8)",
      "(2016, 9)",
      "(2016, 10)",
      "(2016, 11)",
      "(2016, 12)",
      "(2017, 1)",
      "(2017, 2)",
      "(2017, 3)",
      "(2017, 4)",
      "(2017, 5)",
      "(2017, 6)",
      "(2017, 7)",
      "(2017, 8)",
      "(2017, 9)",
      "(2017, 10)",
      "(2017, 11)",
      "(2017, 12)",
      "(2018, 1)",
      "(2018, 2)",
      "(2018, 3)",
      "(2018, 4)",
      "(2018, 5)",
      "(2018, 6)",
      "(2018, 7)",
      "(2018, 8)",
      "(2018, 9)",
      "(2018, 10)",
      "(2018, 11)",
      "(2018, 12)",
      "(2019, 1)",
      "(2019, 2)",
      "(2019, 3)",
      "(2019, 4)",
      "(2019, 5)",
      "(2019, 6)",
      "(2019, 7)",
      "(2019, 8)",
      "(2019, 9)",
      "(2019, 10)",
      "(2019, 11)",
      "(2019, 12)",
      "(2020, 1)",
      "(2020, 2)",
      "(2020, 3)",
      "(2020, 4)",
      "(2020, 5)",
      "(2020, 6)",
      "(2020, 7)",
      "(2020, 8)",
    ],
    datasets: [
      {
        label: "Bukan Hoax",
        data: [
          null,
          1.0,
          4.0,
          2.0,
          3.0,
          4.0,
          1.0,
          2.0,
          5.0,
          1.0,
          4.0,
          9.0,
          6.0,
          1.0,
          3.0,
          22.0,
          19.0,
          24.0,
          12.0,
          13.0,
          12.0,
          9.0,
          3.0,
          9.0,
          12.0,
          15.0,
          28.0,
          33.0,
          24.0,
          43.0,
          38.0,
          53.0,
          39.0,
          26.0,
          25.0,
          40.0,
          43.0,
          35.0,
          32.0,
          5.0,
          9.0,
          3.0,
          7.0,
          7.0,
          18.0,
          10.0,
          1.0,
          2.0,
          3.0,
          10.0,
          3.0,
          null,
          3.0,
          null,
          4.0,
          13.0,
          2.0,
          2.0,
          1.0,
          null,
          7.0,
        ],
        backgroundColor: "#0db7c5",
      },
      {
        label: "Hoax",
        data: [
          1.0, 7.0, 13.0, 7.0, 8.0, 10.0, 13.0, 11.0, 4.0, 9.0, 10.0, 16.0, 5.0, 6.0, 11.0, 40.0,
          48.0, 38.0, 47.0, 20.0, 18.0, 25.0, 10.0, 7.0, 10.0, 43.0, 60.0, 79.0, 55.0, 55.0, 48.0,
          63.0, 70.0, 63.0, 48.0, 64.0, 74.0, 92.0, 48.0, 21.0, 34.0, 60.0, 71.0, 72.0, 80.0, 68.0,
          49.0, 111.0, 66.0, 93.0, 97.0, 80.0, 104.0, 111.0, 83.0, 185.0, 148.0, 177.0, 145.0,
          192.0, 160.0,
        ],
        backgroundColor: "#d03850",
      },
    ],
  };

  return (
    <div style={{ marginBottom: "32px" }}>
      <Bar
        style={{ minHeight: "400px" }}
        data={data}
        options={{
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Sebaran Hoax per Waktu",
              font: {
                size: 20,
              },
            },
          },
          responsive: true,
          scales: {
            x: {
              stacked: true,
              ticks: {
                maxRotation: 90,
                minRotation: 90,
              },
              title: {
                display: true,
                text: "(Tahun, Bulan)",
                font: {
                  size: 14,
                },
              },
              grid: {
                display: false,
              },
            },
            y: {
              stacked: true,
            },
          },
        }}
      />
    </div>
  );
};

export { PieChart, BarChart };
