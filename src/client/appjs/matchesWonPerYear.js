document.addEventListener("DOMContentLoaded", async () => {

  let matchesWonPerYear = await fetch(
    "http://localhost:3000/wonMatchesPerYear",
    {
      "Content-Type": "text/json",
      "Access-Control-Allow-Origin": "*",
    }
  );

  matchesWonPerYear = await matchesWonPerYear.json();

  const year = Object.keys(matchesWonPerYear).map((key) => {
    return key;
  });

  let teamsInIpl = Object.values(matchesWonPerYear).reduce(
    (acc, currVal) => acc.concat(Object.keys(currVal)),
    []
  );

  let uniqueTeams = [...new Set(teamsInIpl)];

  let arrayOfTeamsWithWinMatches = uniqueTeams.map((ele) => {
    let valuesOfMatchesWonPerYear = Object.values(matchesWonPerYear).reduce(
      (acc, currVal) => {
        if (!acc[ele]) {
          acc[ele] = [];
          acc[ele].push(currVal[ele] || null);
        } else {
          acc[ele].push(currVal[ele] || null);
        }
        return acc;
      },
      {}
    );
    valuesOfMatchesWonPerYear.name = ele;
    return valuesOfMatchesWonPerYear;
  });

  arrayOfTeamsWithWinMatches.splice(10, 1);

  let matchWonDataToVisualize = arrayOfTeamsWithWinMatches.map((ele) => {
    return { name: ele.name, data: ele[ele.name] };
  });

  Highcharts.chart("container4", {
    chart: {
      type: "column",
    },
    title: {
      text: '<span style="font-size:20px;font-weight:bold;">Matches Won Per Year</span>',
    },
    xAxis: {
      categories: year,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: '<span style="font-size:11px;font-weight:bold;">No of Matches Won</span>',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px;font-weight:bold;">{point.key}</span><table>',
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
    series: matchWonDataToVisualize,
  });
});
