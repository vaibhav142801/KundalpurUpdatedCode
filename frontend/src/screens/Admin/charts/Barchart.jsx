import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const Barchart = () => {
  const labels = [
    "May 2022",
    "June 2022",
    "July 2022",
    "April",
    "July 2022",
    "Sep 2022",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "#5ECD07",
        borderColor: "#5ECD07",
        data: [5, 10, 5, 28, 20, 30, 45],
      },
      {
        label: "My First dataset",
        backgroundColor: "#1669E6",
        borderColor: "#1669E6",
        data: [20, 15, 5, 2, 23, 10, 60],
      },
    ],
  };
  return (
    <>
      <Bar data={data} />
    </>
  );
};

export default Barchart;
