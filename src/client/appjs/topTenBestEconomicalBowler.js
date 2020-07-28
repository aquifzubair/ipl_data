document.addEventListener("DOMContentLoaded", async () => {
  let topTenBestEconomicalBowler = await fetch(
    "http://localhost:3000/topTenBestBowlerByEconomy",
    {
      "Content-Type": "text/json",
      "Access-Control-Allow-Origin": "*",
    }
  );
  topTenBestEconomicalBowler = await topTenBestEconomicalBowler.json();

  const hightChartData = topTenBestEconomicalBowler.map((key) => {
    return {
      name: key.bowler,
      y: key.economy,
    };
  });

  Highcharts.chart("container3", {
    chart: {
      type: "column",
    },
    title: {
      text: "Top ten Economical Bowler in 2015",
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
        text: "Bowler Economy",
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
          format: "{point.y:.2f}",
        },
      },
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b><br/>',
    },

    series: [
      {
        name: "Bowler Name with Economy",
        colorByPoint: true,
        data: hightChartData,
      },
    ],
  });
});
