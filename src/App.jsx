import React, { Component } from "react";
import "antd/dist/antd.css";
import { Row, Col } from "antd";

import MapComponent from "./components/MapComponent";
import TripCards from "./components/TripCards";
import readFile from "./methods/readFile";
import helpers from "./methods/helpers";

import fileNames from "./other/fileNames";

const MS_TO_MPH = 2.23694;

class App extends Component {
  state = {
    list: [],
    infoIndex: 0,
    infoText: "Click on the lines"
  };
  names = [];
  componentWillMount() {
    let list = [];
    for (let i = 0; i < 10; i++) {
      this.names.push(fileNames[i]);
      let data = {
        id: i,
        name: fileNames[i],
        loading: true,
        color: "",
        isActive: false,
        data: {
          coords: [],
          start_time: "",
          end_time: ""
        }
      };
      list.push(data);
    }
    this.setState({ list });
  }
  componentDidMount() {
    this.names.forEach(fileName =>
      readFile(fileName)
        .then(response => response.json())
        .then(data => {
          this.setState(prevState => {
            let list = prevState.list;
            let index = list.findIndex(x => x.name === fileName);
            list[index] = {
              id: index,
              name: fileName,
              loading: false,
              isActive: false,
              color: helpers.colorFromName(data.start_time + data.end_time),
              data: data
            };
            return { list };
          });
          return data;
        })
        .catch(console.log)
    );
  }

  handleLineClick = e => {
    console.log(e);
    return;
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    let currentData = helpers.findByCoords(lat, lng, this.state.data.coords);
    let infoIndex = currentData.index;
    let infoText = `Speed: ${(MS_TO_MPH * currentData.speed).toFixed(2)} mph`;
    this.setState({ infoIndex, infoText });
  };

  cardMouseEnter = e => {
    //let index = e.currentTarget.id;
    this.setState({ isActive: true });
  };
  cardMouseLeave = e => {
    //let index = e.currentTarget.id;
    this.setState({ isActive: false });
  };

  siderStyle = {
    height: "100vh",
    overflowY: "scroll"
  };
  render() {
    return (
      <Row>
        <Col span={18}>
          <MapComponent
            {...this.state}
            onLineClick={this.handleLineClick.bind(this)}
          />
        </Col>
        <Col span={6} style={this.siderStyle}>
          <TripCards
            {...this.state}
            onMouseEnter={this.cardMouseEnter.bind(this)}
            onMouseLeave={this.cardMouseLeave.bind(this)}
          />
        </Col>
      </Row>
    );
  }
}

export default App;
