//from : https://www.fusioncharts.com/dev/getting-started/react/your-first-chart-using-react

// STEP 1 - Include Dependencies
// Include react
import React from "react";
import ReactDOM from "react-dom";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.carbon";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, chart, FusionTheme);

// STEP 2 - Chart Data
// const chartData = [
//   {
//     label: "HTML",
//     value: "13",
//   },
//   {
//     label: "CSS",
//     value: "23",
//   },
//   {
//     label: "JS",
//     value: "32",
//   },
// ];

const ChartComponent = ({ data }) => {
  // STEP 3 - Creating the JSON object to store the chart configurations
  const chartConfigs = {
    type: "doughnut2d", // The chart type
    width: "400", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Stars Per Language",
        decimals: 0,
        pieRadius: "45%",
        doughnutRadius: "60%",
        showPercentValues: 0,
        captionFontColor: "#102a42",
        captionFontBold: 0,
        captionFontSize: 20,
        captionFont: "Roboto",
        baseFont: "Open Sans",
        baseFontSize: 16,
        baseFontColor: "#617d98",
        smartLineColor: "#617d98",
        showShadow: 0,
        showPlotBorder: 0,
        paletteColors:
          "#2caeba, #5D62B5, #FFC533, #F2726F, #8d6e63, #1de9b6, #6E80CA",
        use3DLighting: 0,
        useDataPlotColorForLabels: 0,
        bgColor: "#FFFFFF",
        showBorder: 0,
      },
      // Chart Data
      data,
    },
  };

  return <ReactFC {...chartConfigs} />;
};
// STEP 4 - Creating the DOM element to pass the react-fusioncharts component
// class App extends React.Component {
//   render() {
//     return <ReactFC {...chartConfigs} />;
//   }
// }

export default ChartComponent;
