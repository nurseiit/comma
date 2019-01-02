import React from "react";

import MapComponent from "./MapComponent";

class MyMap extends React.PureComponent {
  componentWillMount() {}

  handleLineClick = e => {
    console.log(e);
  };

  render() {
    const { coords, color } = this.props;
    return (
      <MapComponent
        coords={coords}
        onLineClick={this.handleLineClick}
        color={color}
      />
    );
  }
}
export default MyMap;
