document.addEventListener("DOMContentLoaded", async () => {
  let highestTimeOutPlayers = await fetch(
    "http://localhost:3000/playerWithHighestTimesOutByAPlayer",
    {
      "Content-Type": "text/json",
      "Access-Control-Allow-Origin": "*",
    }
  );
  highestTimeOutPlayers = await highestTimeOutPlayers.json();

  const hightChartData = highestTimeOutPlayers.map((key) => {
    return {
      name: key[0],
      y: key[1],
    };
  });

  Highcharts.chart("container8", {
    chart: {
      type: "column",
    },
    title: {
      text:
        '<span style="font-size:20px;font-weight:bold;">Player Out Maximum No of Time by a particular Player</span>',
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
          '<span style="font-size:11px;font-weight:bold;">Total No of Outs</span>',
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
        name: "Total No of Outs",
        colorByPoint: true,
        data: hightChartData,
      },
    ],
  });
});
