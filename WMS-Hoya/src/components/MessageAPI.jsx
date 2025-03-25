import { message } from "antd";
import { useEffect } from "react";

const MessageAPI = ({ MessageType, MessageText }) => {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (MessageType === "error") {
      msg();
    } else if (MessageType === "success") {
      msg();
    } else if (MessageType === "warning") {
      msg();
    } else if (MessageType === "info") {
      msg();
    }
  }, [MessageType]);

  const msg = () => {
    messageApi.open({
      type: MessageType,
      content: MessageText,
      duration: 3,
    });
  };

  return <>{contextHolder}</>;
};

export default MessageAPI;
