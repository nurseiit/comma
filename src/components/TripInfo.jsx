import React from "react";
import { Card, Skeleton, Icon, Avatar } from "antd";

const { Meta } = Card;

const TripInfo = props => {
  const { loading, index, color, title } = props;
  return (
    <Card
      style={{ width: "100%", marginBottom: 10 }}
      actions={[<Icon type="eye" />, <Icon type="car" />]}
      hoverable={true}
    >
      <Skeleton loading={loading} avatar active>
        <Meta
          avatar={
            <Avatar
              style={{
                backgroundColor: color,
                verticalAlign: "middle",
                fontWeight: "bold"
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
      <div>
        <p>Average speed: 30 mph</p>
      </div>
    </Card>
  );
};

export default TripInfo;
