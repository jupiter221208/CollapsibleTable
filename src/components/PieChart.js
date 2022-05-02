import ReactApexChart from "react-apexcharts";

// json data
import GroupedFindings from "../assets/grouped_findings.json";

const PieChart = () => {
  const getPercent = (type) => {
    const count = GroupedFindings.filter((row) => row.severity === type).length;
    return parseFloat(((count * 100) / GroupedFindings.length).toFixed(2));
  };
  const options = {
    labels: [
      `Critical (${getPercent("critical").toString()}%)`,
      `High (${getPercent("high").toString()}%)`,
      `Medium (${getPercent("medium").toString()}%)`,
      `Low (${getPercent("low").toString()}%)`,
    ],
    theme: {
      monochrome: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
        },
      },
    ],
    chart: {
      events: {
        dataPointSelection: (config) => {
          console.log(config.w.config.labels[config.dataPointIndex]);
        },
      },
      width: 400,
      type: "donut",
    },
    legend: {
      show: true,
      position: "bottom",
    },
  };

  const series = [
    getPercent("critical"),
    getPercent("high"),
    getPercent("medium"),
    getPercent("low"),
  ];
  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        width="600"
      />
    </div>
  );
};

export default PieChart;
