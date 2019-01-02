import React, { Component } from "react";
import "antd/dist/antd.css";
import { Row, Col } from "antd";

import MyMap from "./components/MyMap";
import TripInfo from "./components/TripInfo";
import readFile from "./methods/readFile";
import colorFromName from "./methods/drawHelpers";

class App extends Component {
  state = {
    data: {
      coords: [],
      start_time: "",
      end_time: ""
    },
    loading: true,
    color: ""
  };
  componentWillMount() {
    readFile("2016-07-02--11-56-24.json")
      .then(response => response.json())
      .then(data => {
        let color = colorFromName(data.start_time);
        this.setState({
          data,
          loading: false,
          color
        });
        return data;
      })
      .catch(console.log);
  }

  siderStyle = {
    height: "100vh",
    overflowY: "scroll"
  };
  render() {
    const trips = [];
    for (let i = 0; i < 1; i++) {
      const { loading, color } = this.state;
      trips.push(
        <TripInfo
          loading={loading}
          index={i}
          title={"11:53, May 15, 2017"}
          color={color}
        />
      );
    }
    const { coords } = this.state.data;
    return (
      <Row>
        <Col span={18}>
          <MyMap coords={coords} color={this.state.color} />
        </Col>
        <Col span={6} style={this.siderStyle}>
          {trips}
        </Col>
      </Row>
    );
  }
}

export default App;
