const { database } = require("../../../config");


const createDbQuery = `CREATE DATABASE IF NOT EXISTS ${database};`;
const useDbQuery = `USE ${database};`;

const createTableForMatchesQuery = `CREATE TABLE IF NOT EXISTS matches( id INT NOT NULL,season INT,city VARCHAR(20),date date,
team1 VARCHAR(50),team2 varchar(50),toss_winner varchar(50),toss_decision varchar(10),result varchar(20),dl_applied INT,
winner varchar(50),win_by_runs INT,win_by_wickets INT,player_of_match varchar(20),venue varchar(100),umpire1 varchar(20),umpire2 varchar(20),
umpire3 varchar(20),PRIMARY KEY (id));`;

const createTableForDeliveriesQuery = `CREATE TABLE IF NOT EXISTS deliveries(match_id INT NOT NULL,inning INT,batting_team varchar(50),
bowling_team varchar(50),over1 INT,ball INT,batsman varchar(20),non_striker varchar(20),
bowler varchar(20),is_super_over INT,wide_runs INT,bye_runs INT,
legbye_runs INT,noball_runs INT,penalty_runs INT,batsman_runs INT,
extra_runs INT,total_runs INT, player_dismissed varchar(20),
dismissal_kind varchar(20),fielder varchar(20));`;

const insertIntoMatchesTableQuery = `LOAD DATA LOCAL INFILE 'src/data/matches.csv'
INTO TABLE matches FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;`;
const insertIntoDeliveriesTableQuery = `LOAD DATA LOCAL INFILE 'src/data/deliveries.csv'
INTO TABLE deliveries FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;`;

const numOfRowsInMatchTable = `SELECT COUNT(*) AS num_of_rows FROM matches;`;
const numOfRowsInDeliveryTable = `SELECT COUNT(*) AS num_of_rows FROM deliveries`;
module.exports = {
    createDbQuery,
    useDbQuery,
    createTableForMatchesQuery,
    createTableForDeliveriesQuery,
    insertIntoMatchesTableQuery,
    insertIntoDeliveriesTableQuery,
    numOfRowsInMatchTable,
    numOfRowsInDeliveryTable
}