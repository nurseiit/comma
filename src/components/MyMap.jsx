import React from "react";
import MapComponent from "./MapComponent";

class MyMap extends React.PureComponent {
  componentWillMount() {}

  render() {
    const { coords, color, onLineClick } = this.props;
    return (
      <MapComponent coords={coords} onLineClick={onLineClick} color={color} />
    );
  }
}
export default MyMap;
