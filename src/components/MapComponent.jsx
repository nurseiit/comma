import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline
} from "react-google-maps";

const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

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
  <GoogleMap defaultZoom={11} defaultCenter={{ lat: 37.6555, lng: -122.4 }}>
    {!props.loading && (
      <div>
        <Polyline
          path={props.coords}
          onClick={props.onLineClick}
          geodesic={true}
          options={{
            strokeColor: props.color,
            strokeOpacity: 0.5,
            strokeWeight: 4.5,
            zIndex: 1
          }}
        />
        <Marker
          position={{
            lat: props.coords[props.infoIndex].lat,
            lng: props.coords[props.infoIndex].lng
          }}
        >
          <InfoBox options={{ closeBoxURL: ``, enableEventPropagation: true }}>
            <div
              style={{
                backgroundColor: `white`,
                opacity: 0.75,
                padding: `5px`,
                width: `150px`
              }}
            >
              <div
                style={{
                  fontSize: `16px`,
                  fontColor: `#08233B`,
                  textAlign: `center`
                }}
              >
                {props.infoText}
              </div>
            </div>
          </InfoBox>
        </Marker>
      </div>
    )}
  </GoogleMap>
));

export default MapComponent;
