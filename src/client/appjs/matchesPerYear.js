document.addEventListener("DOMContentLoaded", async () => {
  let matchesPerYear = await fetch("http://localhost:3000/matchesPerYear", {
    "Content-Type": "text/json",
    "Access-Control-Allow-Origin": "*",
  });
  matchesPerYear = await matchesPerYear.json();

  const hightChartData = Object.keys(matchesPerYear).map((key) => {
    return {
      name: key,
      y: matchesPerYear[key],
    };
  });

  Highcharts.chart("container1", {
    chart: {
      type: "column",
    },
    title: {
      text:
        '<span style="font-size:20px;font-weight:bold;">Number of Matches Every Year in IPL</span>',
    },

    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text:
          '<span style="font-size:11px;font-weight:bold;">Total No of Matches</span>',
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y:.0f}",
        },
      },
    },

    tooltip: {
      headerFormat:
        '<span style="font-size:11px;font-weight:bold;">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color};font-weight:bold;">{point.name}</span>: <b>{point.y:.0f}</b><br/>',
    },

    series: [
      {
        name: "Matches in Given Year",
        colorByPoint: true,
        data: hightChartData,
      },
    ],
  });
});
