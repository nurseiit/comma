import React from "react";
import helpers from "../methods/helpers";
import MapComponent from "./MapComponent";

class MyMap extends React.PureComponent {
  componentWillMount() {}

  handleLineClick = e => {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    let currentData = helpers.findByCoords(lat, lng, this.props.coords);
    console.log(currentData);
  };

  render() {
    const { coords, color } = this.props;
    return (
      <MapComponent
        coords={coords}
        onLineClick={this.handleLineClick.bind(this)}
        color={color}
      />
    );
  }
}
export default MyMap;
