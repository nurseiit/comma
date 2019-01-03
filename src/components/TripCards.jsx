import React from "react";
import TripInfo from "./TripInfo";
import helpers from "../methods/helpers";

const TripCards = props => {
  const trips = [];
  const { start_time, end_time, coords } = props.data;
  let distance = (coords.length ? coords[coords.length - 1].dist : 0.0).toFixed(
    2
  );
  let time = helpers.secondsFromInterval(start_time, end_time) / 3600;
  let speed_avg = (coords.length ? distance / time : 0).toFixed(2);
  trips.push(
    <TripInfo
      {...props}
      index={0}
      key={0}
      title={helpers.nameFromDate(start_time)}
      length={helpers.lengthFromInterval(start_time, end_time)}
      speed_avg={speed_avg}
      distance={distance}
    />
  );
  return trips;
};

export default TripCards;
