document.addEventListener("DOMContentLoaded", async () => {
  let matchesPerYear;

  try {
    matchesPerYear = await fetch("http://localhost:3000/matchesPerYear", {
      "Content-Type": "text/json",
      "Access-Control-Allow-Origin": "*",
    });

    if (matchesPerYear.status === 200) {
      matchesPerYear = await matchesPerYear.json();
    }    
    else {
      throw new Error(`Status code is not 200`);
    }
  } 
  
  catch (err) {
    console.error(`Can't fetch the output data ${err}`);
  }


  const hightChartData = Object.keys(matchesPerYear).map((key) => {
    return {
      name: key,
      y: matchesPerYear[key],
    };
  });

  Highcharts.chart("container1", {
    chart: {
      type: "column",
    },
    title: {
      text:
        '<span class="table-header">Number of Matches Every Year in IPL</span>',
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
        text: '<span class="y-axis">Total No of Matches</span>',
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
      headerFormat: '<span class="y-axis">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color};font-weight:bold;">{point.name}</span>: <b>{point.y:.0f}</b><br/>',
    },

    series: [
      {
        name: "Matches in Given Year",
        colorByPoint: true,
        data: hightChartData,
      },
    ],
  });
});
