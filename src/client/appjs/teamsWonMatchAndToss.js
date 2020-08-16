document.addEventListener("DOMContentLoaded", async () => {
  let wonMatchesAndToss;

  try {
    wonMatchesAndToss = await fetch(
      "http://localhost:3000/teamsWonMatchAndToss",
      {
        "Content-Type": "text/json",
        "Access-Control-Allow-Origin": "*",
      }
    );

    if (wonMatchesAndToss.status === 200) {
      wonMatchesAndToss = await wonMatchesAndToss.json();
    }
    else {
      throw new Error(`Status code is not 200`);
    }
  } 
  
  catch (err) {
    console.error(`Can't fetch the output data ${err}`);
  }

  const hightChartData = wonMatchesAndToss.map((key) => {
    return {
      name: key.winner,
      y: key.num_of_wins,
    };
  });

  Highcharts.chart("container5", {
    chart: {
      type: "column",
    },
    title: {
      text:
        '<span class="table-header">Number of Matches Team Won Toss as well as Match</span>',
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
          '<span class="y-axis">Total No of Matches</span>',
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
        name: "Matches Won with Toss Won",
        colorByPoint: true,
        data: hightChartData,
      },
    ],
  });
});
