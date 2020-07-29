document.addEventListener("DOMContentLoaded", async () => {
    let strikerateOfDhoni = await fetch("http://localhost:3000/strikeRateOfParticularPerson", {
      "Content-Type": "text/json",
      "Access-Control-Allow-Origin": "*",
    });
    strikerateOfDhoni = await strikerateOfDhoni.json();
    const highChartData = []
  
   strikerateOfDhoni['MS Dhoni'].map((key) => {
        Object.entries(key).map(val  => {
            // console.log(val)
            highChartData.push({
                name: val[0],
                y:val[1],
              });
        })
     
    });

    let firstItem = highChartData.shift();
    highChartData.push(firstItem)
  
    Highcharts.chart("container6", {
      chart: {
        type: "column",
      },
      title: {
        text: '<span style="font-size:20px;font-weight:bold;">Strike rate of Dhone every Year in IPL</span>',
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
          text:  '<span style="font-size:11px;font-weight:bold;">Strike Rate</span>',
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
          name: "Dhoni's Ipl year and strike rate",
          colorByPoint: true,
          data: highChartData,
        },
      ],
    });
  });
  