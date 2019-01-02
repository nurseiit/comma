import React from "react";
import TripInfo from "./TripInfo";
import drawHelpers from "../methods/drawHelpers";

const TripCards = props => {
  const trips = [];
  for (let i = 0; i < 1; i++) {
    const { loading, color, start_time } = props;
    trips.push(
      <TripInfo
        loading={loading}
        index={i}
        title={drawHelpers.nameFromDate(start_time)}
        color={color}
      />
    );
  }
  return trips;
};

export default TripCards;
