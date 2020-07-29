document.addEventListener("DOMContentLoaded", async () => {
  let maxNoOfMomPerYear = await fetch(
    "http://localhost:3000/maximumMomPlayerInEverySeason",
    {
      "Content-Type": "text/json",
      "Access-Control-Allow-Origin": "*",
    }
  );
  maxNoOfMomPerYear = await maxNoOfMomPerYear.json();

  const hightChartData = maxNoOfMomPerYear.map((item) => {
    let name = `${item[0]} ${item[1]}`;
    let yAxis = `${item[2]}`;
    return {
      name: name,
      y: +yAxis,
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
