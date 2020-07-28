document.addEventListener("DOMContentLoaded",async  () => {

    let extraRunPerTeamIn2016 = await fetch("http://localhost:3000/extraRunPerTeamIn2016", {
      "Content-Type": "text/json",
      "Access-Control-Allow-Origin": "*",
    })
    extraRunPerTeamIn2016 = await extraRunPerTeamIn2016.json();
    
    const hightChartData = Object.keys(extraRunPerTeamIn2016).map(key => {
      return {
        name: key,
        y: extraRunPerTeamIn2016[key],
      }
    })    
    
      Highcharts.chart("container2", {
        chart: {
          type: "column",
        },
        title: {
          text: '<span style="font-size:20px;font-weight:bold;">Extra Run Per Team in 2016</span>',
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
            text: '<span style="font-size:11px;font-weight:bold;">Total No of Extra Runs</span>',
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
          headerFormat: '<span style="font-size:11px;font-weight:bold;">{series.name}</span><br>',
          pointFormat:
            '<span style="color:{point.color};font-weight:bold;">{point.name}</span>: <b>{point.y:.0f}</b><br/>',
        },
    
        series: [
          {
            name: "Matches in 2016",
            colorByPoint: true,
            data: hightChartData
          },
        ]
      });
    }    
    );
    