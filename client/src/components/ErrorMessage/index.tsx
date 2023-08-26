import { Alert } from "antd";

type TProps = {
  message?: string;
};

export const ErrorMessage: React.FC<TProps> = ({ message }) => {
  if (!message) {
    return null;
  }
  return <Alert message={message} type="error" />;
};
