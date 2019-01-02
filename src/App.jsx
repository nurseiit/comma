import React, { Component } from "react";
import "antd/dist/antd.css";
import { Row, Col } from "antd";

import MyMap from "./components/MyMap";
import TripInfo from "./components/TripInfo";

class App extends Component {
  siderStyle = {
    height: "100vh",
    overflowY: "scroll"
  };
  render() {
    const trips = [];
    for (let i = 0; i < 50; i++) {
      trips.push(
        <TripInfo
          loading={false}
          index={i}
          title={"11:53, May 15, 2017"}
          color={"red"}
        />
      );
    }
    return (
      <Row>
        <Col span={18}>
          <MyMap />
        </Col>
        <Col span={6} style={this.siderStyle}>
          {trips}
        </Col>
      </Row>
    );
  }
}

export default App;
