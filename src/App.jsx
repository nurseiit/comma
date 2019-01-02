import React, { Component } from "react";
import "antd/dist/antd.css";
import { Row, Col } from "antd";

import MyMap from "./components/MyMap";
import TripInfo from "./components/TripInfo";

class App extends Component {
  siderStyle = {
    color: "white",
    backgroundColor: "#282c34",
    height: "100vh"
  };
  render() {
    return (
      <Row>
        <Col span={16}>
          <MyMap />
        </Col>
        <Col span={8} style={this.siderStyle}>
          <TripInfo
            loading={false}
            index={0}
            title={"11:53, May 15, 2017"}
            color={"red"}
          />
        </Col>
      </Row>
    );
  }
}

export default App;
