import React from "react";
import { Popover, Card, Skeleton, Avatar } from "antd";

const { Meta } = Card;

const TripInfo = props => {
  const { loading, index, color, title, length, distance, speed_avg } = props;
  const text = <span>Trip #{index + 1}</span>;
  const content = (
    <div>
      <p>
        Total distance: <b>{distance}</b> miles.
      </p>
      <p>
        Average speed: <b>{speed_avg}</b> mph.
      </p>
    </div>
  );
  return (
    <Popover placement="left" title={text} content={content} trigger="hover">
      <Card
        style={{ width: "100%", margin: "auto" }}
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
            description={`Lasted for ${length}`}
          />
        </Skeleton>
      </Card>
    </Popover>
  );
};

export default TripInfo;
