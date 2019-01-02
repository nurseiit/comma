import React, { Component } from "react";
import "antd/dist/antd.css";
import { Row, Col } from "antd";

import MyMap from "./components/MyMap";
import TripCards from "./components/TripCards";
import readFile from "./methods/readFile";
import helpers from "./methods/helpers";

class App extends Component {
  state = {
    data: {
      coords: [],
      start_time: "",
      end_time: ""
    },
    loading: true,
    color: "",
    infoIndex: 0,
    infoText: "Click on the lines"
  };
  componentDidMount() {
    readFile("2016-07-02--11-56-24.json")
      .then(response => response.json())
      .then(data => {
        this.setState({
          data,
          loading: false,
          color: helpers.colorFromName(data.start_time)
        });
        return data;
      })
      .catch(console.log);
  }

  handleLineClick = e => {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    let currentData = helpers.findByCoords(lat, lng, this.state.data.coords);
    let infoIndex = currentData.index;
    let infoText = `Speed: ${currentData.speed.toFixed(2)} mph`;
    this.setState({ infoIndex, infoText });
  };

  siderStyle = {
    height: "100vh",
    overflowY: "scroll"
  };
  render() {
    const { coords } = this.state.data;
    const { color, loading, infoIndex, infoText } = this.state;
    return (
      <Row>
        <Col span={18}>
          <MyMap
            coords={coords}
            color={color}
            onLineClick={this.handleLineClick.bind(this)}
            infoIndex={infoIndex}
            infoText={infoText}
          />
        </Col>
        <Col span={6} style={this.siderStyle}>
          <TripCards loading={loading} color={color} data={this.state.data} />
        </Col>
      </Row>
    );
  }
}

export default App;
