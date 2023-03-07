import {useState} from "react";
import {AlertColor} from "@mui/material";

export const useNotification = () => {
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>('');

  const [notificationSeverity, setNotificationSeverity] = useState<AlertColor | undefined>(undefined);

  const showNotification = (message: string, severity: AlertColor) => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setNotificationOpen(true);
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  return {showNotification, handleNotificationClose, notificationMessage, notificationOpen, notificationSeverity}
};