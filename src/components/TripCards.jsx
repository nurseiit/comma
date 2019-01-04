import React from "react";
import TripInfo from "./TripInfo";
import helpers from "../methods/helpers";

const TripCards = props => {
  const trips = [];
  const { minList, onMouseEnter } = props;
  for (let i = 0; i < minList.length; i++) {
    const {
      start_time,
      end_time,
      coordLen,
      coordLastDist,
      loading,
      color
    } = minList[i];
    let distance = (coordLen ? coordLastDist : 0.0).toFixed(2);
    let time = helpers.secondsFromInterval(start_time, end_time) / 3600;
    let speed_avg = (coordLen ? distance / time : 0).toFixed(2);
    trips.push(
      <TripInfo
        loading={loading}
        color={color}
        index={i}
        key={i}
        title={helpers.nameFromDate(start_time)}
        length={helpers.lengthFromInterval(start_time, end_time)}
        speed_avg={speed_avg}
        distance={distance}
        onMouseEnter={onMouseEnter}
      />
    );
  }
  return trips;
};

export default TripCards;
