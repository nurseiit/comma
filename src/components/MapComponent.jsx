import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

import DrawLines from "./DrawLines";

const MapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDu2lXe6b5E55W6iKajZbZ0jB5Im0Byk3M&v=3.exp",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  return (
    <GoogleMap
      onTilesLoaded={props.onLoaded}
      defaultZoom={8}
      defaultCenter={{ lat: 37.8555, lng: -122.1 }}
    >
      <DrawLines {...props} />
    </GoogleMap>
  );
});

export default MapComponent;
