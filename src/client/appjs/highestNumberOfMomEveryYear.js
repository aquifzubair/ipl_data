document.addEventListener("DOMContentLoaded", async () => {
  let maxNoOfMomPerYear;

  try {
    maxNoOfMomPerYear = await axios.get("/highestNumberOfMomEveryYear");

    if (maxNoOfMomPerYear.status === 200) {
      maxNoOfMomPerYear = await maxNoOfMomPerYear.data;
    }
    else {
      throw new Error(`Status code is not 200`);
    }
  } 
  
  catch (err) {
    document.getElementById("container9").innerHTML = `Not able to fetch highest number of MOM every year data...`;
    console.error(`Can't fetch the output data ${err}`);
    return;
  }

  const hightChartData = maxNoOfMomPerYear.map((item) => {
    let name = `${item.season} - ${item.player_name}`;
    return {
      name: name,
      y: item.num_of_mom,
    };
  });

  Highcharts.chart("container9", {
    chart: {
      type: "column",
    },
    title: {
      text:
        '<span class="table-header">Maximum No of Man of the Match every Year</span>',
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
          '<span class="y-axis">No of Man of the Match</span>',
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
        name: "Max no of MOM in this Year",
        colorByPoint: true,
        data: hightChartData,
      },
    ],
  });
});
