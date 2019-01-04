import React from "react";
import TripInfo from "./TripInfo";
import helpers from "../methods/helpers";

const TripCards = props => {
  const trips = [];
  const { list } = props;
  for (let i = 0; i < list.length; i++) {
    const { start_time, end_time, coords } = list[i].data;
    let distance = (coords.length
      ? coords[coords.length - 1].dist
      : 0.0
    ).toFixed(2);
    let time = helpers.secondsFromInterval(start_time, end_time) / 3600;
    let speed_avg = (coords.length ? distance / time : 0).toFixed(2);
    trips.push(
      <TripInfo
        {...props}
        {...list[i]}
        index={i}
        key={i}
        title={helpers.nameFromDate(start_time)}
        length={helpers.lengthFromInterval(start_time, end_time)}
        speed_avg={speed_avg}
        distance={distance}
      />
    );
  }
  return trips;
};

export default TripCards;
