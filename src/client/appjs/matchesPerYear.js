document.addEventListener("DOMContentLoaded", async () => {
  let matchesPerYear;

  try {
    matchesPerYear = await axios.get('/matchesPerYear');

    if (matchesPerYear.status === 200) {
      matchesPerYear = matchesPerYear.data;
    }
    else {
      
      throw new Error(`Status code is not 200`);
    }
  } 
  
  catch (err) {
    document.getElementById("container1").innerHTML = `Not able to fetch matches per year data...`;
    console.error(`Can't fetch the output data ${err}`);
    return;
  }

  const hightChartData = matchesPerYear.map(elem => {
    return{
      name:elem.season,
      y:elem.num_of_matches
    }
  })
  

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
        name: "Matches in Given Year",
        colorByPoint: true,
        data: hightChartData,
      },
    ],
  });
});
