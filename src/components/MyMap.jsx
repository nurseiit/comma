import React from "react";
import MapComponent from "./MapComponent";

class MyMap extends React.PureComponent {
  componentWillMount() {}

  render() {
    const { coords, color, onLineClick, infoIndex, infoText } = this.props;
    return (
      <MapComponent
        coords={coords}
        onLineClick={onLineClick}
        color={color}
        infoIndex={infoIndex}
        infoText={infoText}
      />
    );
  }
}
export default MyMap;
