document.addEventListener("DOMContentLoaded", async () => {
  let matchesWonPerYear;

  try {
    matchesWonPerYear = await fetch("http://localhost:3000/wonMatchesPerYear", {
      "Content-Type": "text/json",
      "Access-Control-Allow-Origin": "*",
    });
    matchesWonPerYear = await matchesWonPerYear.json();
  } 
  catch (err) {
    console.error(err);
  }

  const year = Object.keys(matchesWonPerYear).map((key) => {
    return key;
  });

  const teamsInIpl = Object.values(matchesWonPerYear).reduce(
    (acc, currVal) => acc.concat(Object.keys(currVal)),
    []
  );

  const uniqueTeams = [...new Set(teamsInIpl)];

  const arrayOfTeamsWithWinMatches = uniqueTeams.map((ele) => {
    const valuesOfMatchesWonPerYear = Object.values(matchesWonPerYear).reduce(
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

  const matchWonDataToVisualize = arrayOfTeamsWithWinMatches.map((ele) => {
    return { name: ele.name, data: ele[ele.name] };
  });

  Highcharts.chart("container4", {
    chart: {
      type: "column",
    },
    title: {
      text:
        '<span style="font-size:20px;font-weight:bold;">Matches Won Per Year</span>',
    },
    xAxis: {
      categories: year,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text:
          '<span style="font-size:11px;font-weight:bold;">No of Matches Won</span>',
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
    series: matchWonDataToVisualize,
  });
});
