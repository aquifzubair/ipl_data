document.addEventListener("DOMContentLoaded", async () => {
  let highestTimeOutPlayers;
  
  try {
    highestTimeOutPlayers = await fetch(
      "http://localhost:3000/mostTimePlayerDismissedByOtherPlayer",
      {
        "Content-Type": "text/json",
        "Access-Control-Allow-Origin": "*",
      }
    );
    highestTimeOutPlayers = await highestTimeOutPlayers.json();
  } 
  catch (err) {
    console.error(err);
  }

  const hightChartData = highestTimeOutPlayers.map((key) => {
    return {
      name: `${key.batsman} outBy ${key.bowler}`,
      y: key.dismissal_time,
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
