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

    if (highestTimeOutPlayers.status === 200) {
      highestTimeOutPlayers = await highestTimeOutPlayers.json();
    }    
    else {
      throw new Error(`Status code is not 200`);
    }
  } 
  
  catch (err) {
    console.error(`Can't fetch the output data ${err}`);
  }

  const hightChartData = highestTimeOutPlayers.map((key) => {
    return {
      name: `${key.batsman} outBy ${key.outBy}`,
      y: key.outTimes,
    };
  });

  Highcharts.chart("container8", {
    chart: {
      type: "column",
    },
    title: {
      text:
        '<span class="table-header">Player Out Maximum No of Time by a particular Player</span>',
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
          '<span class="y-axis">Total No of Outs</span>',
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
        '<span class="y-axis">{series.name}</span><br>',
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
