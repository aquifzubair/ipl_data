document.addEventListener("DOMContentLoaded", async () => {
  let topTenBestEconomicalBowler;

  try {
    topTenBestEconomicalBowler = await axios.get("/topTenBestBowlerByEconomy");
    
    if (topTenBestEconomicalBowler.status === 200) {
      topTenBestEconomicalBowler = await topTenBestEconomicalBowler.data;
    }
    else {
      throw new Error(`Status code is not 200`);
    }
  } 
  
  catch (err) {
    console.error(`Can't fetch the output data ${err}`);
  }

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
      text:
        '<span class="table-header">Top ten Economical Bowlers in 2015</span>',
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
          '<span class="y-axis">Bowler Economy</span>',
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
      headerFormat:
        '<span style="font-size:11px;font-weight:bold;">{series.name}</span><br>',
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
