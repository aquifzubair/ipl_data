const matchOfParticularYear = (matches, year) => {
  return matches.filter((match) => match.season == year);
};

const deliveryOfParticularYear = (matches, deliveries, year) => {
  const matchOfYear = matchOfParticularYear(matches, year);
  return deliveries.filter((delivery) => {
    for (let match of matchOfYear) {
      if (delivery.match_id == match.id) return true;
    }
    return false;
  });
};

const playerRunAndBowlData = (match, deliveries, player, year) => {
  const deliver = deliveryOfParticularYear(match, deliveries, year);
  const batsmanData = {};

  for (let delivery of deliver) {
    if (delivery.batsman == player) {
      if (batsmanData[year]) {
        batsmanData[year].bowl += 1;
        batsmanData[year].runs += +delivery.batsman_runs;
      } else {
        batsmanData[year] = {};
        batsmanData[year].bowl = 1;
        batsmanData[year].runs = +delivery.batsman_runs;
      }
    }
  }
  if (Object.keys(batsmanData).length !== 0) return batsmanData;
};

const deliveryOfSuperOver = (deliveries) => {
  const delOfSuperOver = deliveries.filter((delivery) => {
    if (delivery.is_super_over !== "0") {
      return delivery;
    }
  });
  return delOfSuperOver;
};

module.exports = {
  deliveryOfParticularYear,
  playerRunAndBowlData,
  deliveryOfSuperOver,
};
