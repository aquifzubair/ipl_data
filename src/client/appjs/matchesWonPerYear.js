document.addEventListener("DOMContentLoaded", async () => {
  let matchesWonPerYear;

  try {
    matchesWonPerYear = await fetch(
      "http://localhost:3000/matchesWonPerYear",
      {
        "Content-Type": "text/json",
        "Access-Control-Allow-Origin": "*",
      }
    );

    if (matchesWonPerYear.status === 200) {
      matchesWonPerYear = await matchesWonPerYear.json();
    }
    else {
      throw new Error(`Status code is not 200`);
    }
  } 
  
  catch (err) {
    console.error(`Can't fetch the output data ${err}`);
  }

  const baseSeason = 2008;
  const winDetailsPerTeams = {};

  for (let item of matchesWonPerYear) {
    const teamName = item.winner;
    const matchesWinByTeam = item.wins;
    const season = item.season;

    if (winDetailsPerTeams[teamName]) {
      winDetailsPerTeams[teamName][season - baseSeason] = matchesWinByTeam;
    } else {
      winDetailsPerTeams[teamName] = new Array(10).fill(null, 0, 10);
      winDetailsPerTeams[teamName][season - baseSeason] = matchesWinByTeam;
    }
  }

  let dataToVisualize = Object.entries(winDetailsPerTeams).map((elem) => {
    return {
      name: elem[0],
      data: elem[1],
    };
  });

  const year = matchesWonPerYear.map((elem) => elem.season);
  const uniqueYear = [...new Set(year)];

  Highcharts.chart("container4", {
    chart: {
      type: "column",
    },
    title: {
      text:
        '<span class="table-header">Matches Won Per Year</span>',
    },
    xAxis: {
      categories: uniqueYear,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text:
          '<span class="y-axis">No of Matches Won</span>',
      },
    },
    tooltip: {
      headerFormat:
        '<span style="font-size:10px;font-weight:bold;">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0;font-weight:bold;">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.0f} win</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: dataToVisualize,
  });
});
