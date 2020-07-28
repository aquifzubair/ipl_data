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
      text: '<span style="font-size:20px;font-weight:bold;">Top ten Economical Bowlers in 2015</span>',
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
        text: '<span style="font-size:11px;font-weight:bold;">Bowler Economy</span>',
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
      headerFormat: '<span style="font-size:11px;font-weight:bold;">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color};font-weight:bold;">{point.name}</span>: <b>{point.y:.2f}</b><br/>',
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
