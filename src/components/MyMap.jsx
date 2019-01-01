import React from "react";

import MapComponent from "./MapComponent";
import readFile from "../methods/readFile";

class MyMap extends React.PureComponent {
  state = {
    isMarkerShown: false,
    coords: [],
    data: {}
  };

  componentDidMount() {
    this.delayedShowMarker();
  }

  componentWillMount() {
    readFile("2016-07-02--11-56-24.json")
      .then(response => response.json())
      .then(data => {
        this.setState({ data });
        this.setState({ coords: data.coords });
        return data;
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
        coords={this.state.coords}
      />
    );
  }
}
export default MyMap;
