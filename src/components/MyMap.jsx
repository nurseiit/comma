import React from "react";
import MapComponent from "./MapComponent";

class MyMap extends React.PureComponent {
  componentWillMount() {}

  render() {
    const {
      coords,
      color,
      onLineClick,
      infoIndex,
      infoText,
      loading
    } = this.props;
    return (
      <MapComponent
        coords={coords}
        onLineClick={onLineClick}
        color={color}
        infoIndex={infoIndex}
        infoText={infoText}
        loading={loading}
      />
    );
  }
}
export default MyMap;
