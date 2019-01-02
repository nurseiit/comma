import React from "react";
import { Popover, Card, Skeleton, Avatar } from "antd";

const { Meta } = Card;

const TripInfo = props => {
  const { loading, index, color, title } = props;
  const text = <span>Info</span>;
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
  return (
    <Popover placement="left" title={text} content={content} trigger="hover">
      <Card
        style={{ width: "100%", margin: "0" }}
        //actions={[<Icon type="eye" />, <Icon type="car" />]}
        hoverable={true}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={
              <Avatar
                style={{
                  backgroundColor: color,
                  verticalAlign: "middle",
                  fontSize: 10,
                  textShadow:
                    "-1px -1px 0 #444, 1px -1px 0 #444, -1px 1px 0 #444, 1px 1px 0 #444",
                  color: "rgba(255,255,255,0.8)"
                }}
                size="large"
              >
                {index + 1}
              </Avatar>
            }
            title={title}
            description={`Lasted for 30 minutes.`}
          />
        </Skeleton>
      </Card>
    </Popover>
  );
};

export default TripInfo;
