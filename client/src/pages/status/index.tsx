import { Button, Result, Row } from "antd";
import { Link, useParams } from "react-router-dom";

const Statuses: Record<string, string> = {
  created: "User created successfully",
  updated: "User updated successfully",
  deleted: "User deleted successfully",
};
export const Status = () => {
  const { status } = useParams();
  return (
    <Row align="middle" justify="center" style={{ width: "100%" }}>
      <Result
        status={status ? "success" : 404}
        title={status ? Statuses[status] : "Not Fount"}
        extra={
          <Button key="dashboard">
            <Link to="/">Go home</Link>
          </Button>
        }
      />
    </Row>
  );
};
