import React from "react";

import MapComponent from "./MapComponent";
import readFile from "../methods/readFile";

class MyMap extends React.PureComponent {
  state = {
    isMarkerShown: false,
    coords: {}
  };

  componentDidMount() {
    this.delayedShowMarker();
  }

  componentWillMount() {
    readFile("2016-07-02--11-56-24.json")
      .then(response => response.json())
      .then(coords => {
        this.setState({ coords });
        return coords;
      })
      .catch(console.log);
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };

  render() {
    return (
      <MapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    );
  }
}
export default MyMap;
