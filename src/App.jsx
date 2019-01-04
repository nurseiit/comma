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
    minList: [],
    infoIndex: 0,
    infoText: "Click on the lines",
    activeIndex: -1,
    activeElement: {}
  };

  defaultInfoText = "Click on the lines";
  names = [];

  componentWillMount() {
    let list = [];
    let minList = [];
    for (let i = 0; i < fileNames.length; i++) {
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
      let minData = {
        id: i,
        name: fileNames[i],
        loading: true,
        color: "",
        start_time: "",
        end_time: ""
      };
      list.push(data);
      minList.push(minData);
    }
    this.setState({ list, minList });
  }
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
            let minList = prevState.minList;
            let index = list.findIndex(x => x.name === fileName);
            let color = helpers.colorFromName(data.start_time + data.end_time);
            list[index] = {
              id: index,
              name: fileName,
              loading: false,
              color,
              data: data
            };
            minList[index] = {
              id: index,
              name: fileName,
              loading: false,
              color,
              start_time: data.start_time,
              end_time: data.end_time,
              coordLen: data.coords.length,
              coordLastDist: data.coords[data.coords.length - 1].dist
            };
            return { list, minList };
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
          />
        </Col>
      </Row>
    );
  }
}

export default App;
