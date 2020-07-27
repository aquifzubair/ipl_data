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
      text: "Number of Matches every year in IPL",
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
        text: "Total No of Matches",
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
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b><br/>',
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
