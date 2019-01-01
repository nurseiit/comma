import React from "react";

import MapComponent from "./MapComponent";
import readFile from "../methods/readFile";

class MyMap extends React.PureComponent {
  state = {
    isMarkerShown: false,
    coords: [],
    data: {},
    name: ""
  };

  componentDidMount() {
    this.delayedShowMarker();
  }

  componentWillMount() {
    readFile("2016-07-02--11-56-24.json")
      .then(response => response.json())
      .then(data => {
        this.setState({
          data,
          coords: data.coords,
          name: data.start_time
        });
        return data;
      })
      .catch(console.log);
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: false }); //set true for the Marker to be Shown
    }, 3000);
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };

  handleLineClick = e => {
    console.log(e);
  };

  render() {
    return (
      <MapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        coords={this.state.coords}
        onLineClick={this.handleLineClick}
        name={this.state.name}
      />
    );
  }
}
export default MyMap;
