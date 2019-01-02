import React, { Component } from "react";
import MyMap from "./components/MyMap";
import { Row, Col } from "antd";
import "antd/dist/antd.css";

class App extends Component {
  siderStyle = {
    color: "white",
    backgroundColor: "#282c34",
    height: "100vh"
  };
  render() {
    return (
      <Row>
        <Col span={18}>
          <MyMap />
        </Col>
        <Col span={6} style={this.siderStyle}>
          <div>Text</div>
        </Col>
      </Row>
    );
  }
}

export default App;
