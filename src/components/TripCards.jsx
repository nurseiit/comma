import React from "react";
import TripInfo from "./TripInfo";
import helpers from "../methods/helpers";

const TripCards = props => {
  const trips = [];
  for (let i = 0; i < 1; i++) {
    const { loading, color, start_time, end_time } = props;
    trips.push(
      <TripInfo
        loading={loading}
        index={i}
        title={helpers.nameFromDate(start_time)}
        color={color}
        length={helpers.lengthFromInterval(start_time, end_time)}
      />
    );
  }
  return trips;
};

export default TripCards;
