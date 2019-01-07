import React from "react";
import TripInfo from "./TripInfo";
import helpers from "../methods/helpers";

const TripCards = props => {
  const { minList, onMouseEnter } = props;

  const trips = minList.map((trip, index) => {
    const {
      start_time,
      end_time,
      coordLen,
      coordLastDist,
      loading,
      color
    } = trip;

    const distance = (coordLen ? coordLastDist : 0.0).toFixed(2);
    const time = helpers.secondsFromInterval(start_time, end_time) / 3600;
    const speed_avg = (coordLen ? distance / time : 0).toFixed(2);

    return (
      <TripInfo
        loading={loading}
        color={color}
        index={index}
        key={index}
        title={helpers.nameFromDate(start_time)}
        length={helpers.lengthFromInterval(start_time, end_time)}
        speed_avg={speed_avg}
        distance={distance}
        onMouseEnter={onMouseEnter}
      />
    );
  });

  return trips;
};

export default TripCards;
