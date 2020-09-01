document.addEventListener("DOMContentLoaded", async () => {
  let strikeRateOfDhoni;

  try {
    strikeRateOfDhoni = await axios.get("/strikeRateOfParticularPerson");

    if (strikeRateOfDhoni.status === 200) {
      strikeRateOfDhoni = await strikeRateOfDhoni.data;
    }
    else {
      throw new Error(`Status code is not 200`);
    }
  } 
  
  catch (err) {
    document.getElementById("container6").innerHTML = `Not able to fetch the strike rate of Dhoni data...`;
    console.error(`Can't fetch the output data ${err}`);
    return;
  }

  const highChartData = strikeRateOfDhoni.map((items) => {
    return {
      name: items.season,
      y: items.strikeRate,
    };
  });

  Highcharts.chart("container6", {
    chart: {
      type: "column",
    },
    title: {
      text:
        '<span class="table-header">Strike rate of Dhoni every Year in IPL</span>',
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
          '<span class="y-axis">Strike Rate</span>',
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
        name: "Dhoni's Ipl year and strike rate",
        colorByPoint: true,
        data: highChartData,
      },
    ],
  });
});
