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
    wonMatchesAndToss = await wonMatchesAndToss.json();
  } 
  catch (err) {
    console.error(err);
  }

  const hightChartData = Object.keys(wonMatchesAndToss).map((key) => {
    return {
      name: key,
      y: wonMatchesAndToss[key],
    };
  });

  Highcharts.chart("container5", {
    chart: {
      type: "column",
    },
    title: {
      text:
        '<span style="font-size:20px;font-weight:bold;">Number of Matches Team Won Toss as well as Match</span>',
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
        name: "Matches Won with Toss Won",
        colorByPoint: true,
        data: hightChartData,
      },
    ],
  });
});
