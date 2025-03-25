import React, { useEffect } from "react";
import { notification } from "antd";

const NotificationAPI = ({ openNotification, description, message }) => {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (openNotification === "success") {
      typeSuccess();
    } else if (openNotification === "error") {
      typeError();
    } else if (openNotification === "info") {
      typeInfo();
    }
  }, [openNotification]);

  const typeSuccess = () => {
    api.open({
      type: "success",
      message: "Success",
      description: description,
      showProgress: true,
      pauseOnHover: true,
      duration: 5,
    });
  };

  const typeInfo = () => {
    api.open({
      type: "info",
      message: message,
      description: description,
      showProgress: true,
      pauseOnHover: true,
      duration: 5,
    });
  };

  const typeError = () => {
    api.open({
      type: "error",
      message: "Error",
      description: description,
      pauseOnHover: true,
      duration: 5,
    });
  };

  return <>{contextHolder}</>;
};

export default NotificationAPI;
