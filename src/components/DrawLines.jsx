import React from "react";
import { Marker, Polyline } from "react-google-maps";

const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

const DrawLines = props => {
  const {
    onLineClick,
    infoIndex,
    infoText,
    isMarkerShown,
    activeElement,
    activeIndex
  } = props;

  if (activeIndex === -1) {
    return <div />;
  }

  const { id, loading, color } = activeElement;
  const { coords } = activeElement.data;
  return (
    <div key={`${id}`}>
      {!loading && (
        <div key={id}>
          <Polyline
            id={id}
            path={coords}
            onClick={onLineClick}
            geodesic={true}
            options={{
              strokeColor: color,
              strokeOpacity: 0.99,
              strokeWeight: 4.5,
              zIndex: 1
            }}
          />
          {isMarkerShown && (
            <Marker
              position={{
                lat: coords[infoIndex].lat,
                lng: coords[infoIndex].lng
              }}
            >
              <InfoBox
                options={{ closeBoxURL: ``, enableEventPropagation: true }}
              >
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
                    {infoText}
                  </div>
                </div>
              </InfoBox>
            </Marker>
          )}
        </div>
      )}
    </div>
  );
};

export default DrawLines;
