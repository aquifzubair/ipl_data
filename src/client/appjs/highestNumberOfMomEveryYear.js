document.addEventListener("DOMContentLoaded", async () => {
  let maxNoOfMomPerYear;

  try {
    maxNoOfMomPerYear = await fetch(
      "http://localhost:3000/highestNumberOfMomEveryYear"
    );
    maxNoOfMomPerYear = await maxNoOfMomPerYear.json();
    console.log(maxNoOfMomPerYear);
  } catch (err) {
    console.error(err);
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
        '<span style="font-size:20px;font-weight:bold;">Maximum No of Man of the Match every Year</span>',
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
          '<span style="font-size:11px;font-weight:bold;">No of Man of the Match</span>',
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
