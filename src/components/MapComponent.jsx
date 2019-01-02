import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline
} from "react-google-maps";

import colorFromName from "../methods/drawHelpers";

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
)(props => (
  <GoogleMap defaultZoom={12} defaultCenter={{ lat: 37.7625, lng: -122.4 }}>
    {props.isMarkerShown && (
      <Marker
        position={{ lat: 37.797, lng: -122.444 }}
        onClick={props.onMarkerClick}
      />
    )}
    <Polyline
      path={props.coords}
      onClick={props.onLineClick}
      geodesic={true}
      options={{
        strokeColor: colorFromName(props.name),
        strokeOpacity: 0.5,
        strokeWeight: 4.5,
        zIndex: 1
      }}
    />
  </GoogleMap>
));

export default MapComponent;
