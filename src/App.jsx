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
    loaded: false,
    list: [],
    infoIndex: 0,
    infoText: "Click on the lines",
    activeIndex: -1,
    activeElement: {}
  };

  defaultInfoText = "Click on the lines";
  names = [];

  componentWillMount() {
    let list = [];
    for (let i = 0; i < 50; i++) {
      this.names.push(fileNames[i]);
      let data = {
        id: i,
        name: fileNames[i],
        loading: true,
        color: "",
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
  componentDidMount() {}
  onMapLoaded = () => {
    if (this.state.loaded) return;
    this.setState({ loaded: true });
    const ele = document.getElementById("ipl-progress-indicator");
    if (ele) {
      ele.classList.add("available");
      setTimeout(() => {
        ele.outerHTML = "";
      }, 2000);
    }
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
              color: helpers.colorFromName(data.start_time + data.end_time),
              data: data
            };
            return { list };
          });
          return data;
        })
        .catch(console.log)
    );
  };
  handleLineClick = e => {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    let currentData = helpers.findByCoords(
      lat,
      lng,
      this.state.activeElement.data.coords
    );
    let infoIndex = currentData.index;
    let infoText = `Speed: ${(MS_TO_MPH * currentData.speed).toFixed(2)} mph`;
    this.setState({ infoIndex, infoText });
  };

  cardMouseEnter = e => {
    let activeIndex = e.currentTarget.id;
    this.setState(prevState => {
      let activeElement = prevState.list[activeIndex];
      return {
        activeIndex,
        activeElement,
        isMarkerShown: true,
        infoIndex: 0,
        infoText: this.defaultInfoText
      };
    });
  };
  cardMouseLeave = e => {
    //    this.setState({ activeIndex: -1 });
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
            onLoaded={this.onMapLoaded.bind(this)}
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
