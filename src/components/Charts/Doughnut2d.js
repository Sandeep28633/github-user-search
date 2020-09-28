import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import candyTheme from "fusioncharts/themes/fusioncharts.theme.candy";

ReactFC.fcRoot(FusionCharts, Column2D, candyTheme);

const Doughnut2D = ({ data }) => {
  const chartConfigs = {
    type: "doughnut2D",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Stars per Language",
        decimal:0,
        theme: "candy",
        pieRadius:"45%",
        showPercentValues :0 ,
      },
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default Doughnut2D;
