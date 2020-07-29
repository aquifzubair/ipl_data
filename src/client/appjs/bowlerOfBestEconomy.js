document.addEventListener("DOMContentLoaded", async () => {
  let matchesPerYear = await fetch(
    "http://localhost:3000/bowlerOfBestEconomy",
    {
      "Content-Type": "text/json",
      "Access-Control-Allow-Origin": "*",
    }
  );
  matchesPerYear = await matchesPerYear.json();

  const hightChartData = [{ name: matchesPerYear[0], y: matchesPerYear[1] }];

  Highcharts.chart("container7", {
    chart: {
      type: "column",
    },
    title: {
      text:
        '<span style="font-size:20px;font-weight:bold;">Best Bowler in Super Over By Economy</span>',
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
        text: '<span style="font-size:11px;font-weight:bold;">Economy</span>',
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
        name: "Bowler Name With Economy",
        colorByPoint: true,
        data: hightChartData,
      },
    ],
  });
});
