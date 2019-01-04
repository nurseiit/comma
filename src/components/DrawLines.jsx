import React from "react";
import { Marker, Polyline } from "react-google-maps";

const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

const DrawLines = props => {
  const { onLineClick, infoIndex, infoText } = props;

  const { list } = props;

  let Lines = [];

  for (let i = 0; i < list.length; i++) {
    const { index, loading, color, isActive, isMarkerShown } = list[i];
    const { coords } = list[i].data;
    Lines.push(
      <div key={`${Math.random()}`}>
        {!loading && (
          <div key={index}>
            <Polyline
              id={index}
              path={coords}
              onClick={onLineClick}
              geodesic={true}
              options={{
                strokeColor: color,
                strokeOpacity: isActive ? 0.99 : 0.35,
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
  }
  return <div>{Lines}</div>;
};

export default DrawLines;
