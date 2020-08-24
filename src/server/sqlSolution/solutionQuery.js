const matchesPerYear = `SELECT season, COUNT(season) AS num_of_matches FROM matches GROUP BY season;`;

const extraRunPerTeamIn2016 = `SELECT bowling_team, SUM(extra_runs) as extraRuns FROM deliveries WHERE 
match_id >= (SELECT id FROM matches WHERE season=2016 ORDER BY id LIMIT 1) and 
match_id <= (SELECT id FROM matches WHERE season=2016 ORDER BY id DESC LIMIT 1) 
GROUP BY bowling_team;`;

const matchesWonPerYear = `select season,winner,count(id) AS wins from matches where winner != ''  group by season,winner;`;

const bowlerOfBestEconomy = `SELECT bowler ,SUM(total_runs) /(COUNT(*)/6) as economy FROM deliveries 
WHERE is_super_over=1 AND noball_runs>0  GROUP BY bowler ORDER BY economy LIMIT 1;`;

const strikeRateOfParticularPerson = `SELECT batsman, season, (SUM(batsman_runs) / count(match_id) * 100) AS strikeRate FROM matches 
INNER JOIN deliveries ON  matches.id = deliveries.match_id WHERE deliveries.batsman = 'MS Dhoni'  
GROUP BY season;`;

const highestNumberOfMomEveryYear = `SELECT season, ANY_VALUE(player_of_match) AS player_name, MAX(mom) AS num_of_mom
FROM (SELECT season,player_of_match, COUNT(player_of_match) AS mom FROM matches 
GROUP BY season, player_of_match ORDER BY season,COUNT(player_of_match) DESC) AS maximum_mom_table 
GROUP BY season;`;

const topTenBestEconomicalBowler = `SELECT bowler ,SUM(total_runs)*6 /(COUNT(*)) as economy
FROM deliveries WHERE match_id >= (SELECT id FROM matches WHERE season=2015 ORDER BY id LIMIT 1) AND 
match_id <= (SELECT id FROM matches WHERE season=2015 ORDER BY id DESC LIMIT 1)
GROUP BY bowler ORDER BY economy LIMIT 10;`;

const teamsWonMatchAndToss = `SELECT winner,COUNT(winner) AS num_of_wins FROM matches WHERE winner = toss_winner GROUP BY winner;`;

const mostTimePlayerDismissedByOtherPlayer = `SELECT batsman, bowler , COUNT(player_dismissed) AS dismissal_time FROM deliveries WHERE batsman=player_dismissed GROUP BY player_dismissed,batsman,bowler ORDER BY dismissal_time DESC LIMIT 1; `;

module.exports = {
  matchesPerYear,
  extraRunPerTeamIn2016,
  matchesWonPerYear,
  bowlerOfBestEconomy,
  strikeRateOfParticularPerson,
  highestNumberOfMomEveryYear,
  topTenBestEconomicalBowler,
  teamsWonMatchAndToss,
  mostTimePlayerDismissedByOtherPlayer,
};
