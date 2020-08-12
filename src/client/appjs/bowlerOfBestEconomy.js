document.addEventListener("DOMContentLoaded", async () => {

  let bowlerOfBestEconomy;
  
  try {
    bowlerOfBestEconomy = await fetch(
      "http://localhost:3000/bowlerOfBestEconomySql",
      {
        "Content-Type": "text/json",
        "Access-Control-Allow-Origin": "*",
      }
    );
    bowlerOfBestEconomy = await bowlerOfBestEconomy.json();
  } 
  catch (err) {
    console.error(err);
  }

  const hightChartData = [
    { name: bowlerOfBestEconomy[0].bowler, y: bowlerOfBestEconomy[0].economy },
  ];

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
