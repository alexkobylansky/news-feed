import React from "react";
import {Snackbar, Alert, AlertColor} from "@mui/material";

interface NotificationProps {
  notificationOpen: boolean;
  handleNotificationClose(): void;
  notificationSeverity: AlertColor | undefined;
  notificationMessage: string
}

export const Notification: React.FC<NotificationProps> = ({notificationOpen, handleNotificationClose, notificationSeverity, notificationMessage}) => {
  return (
    <Snackbar open={notificationOpen}
              autoHideDuration={3000}
              onClose={handleNotificationClose}
              anchorOrigin={{vertical: 'top', horizontal: 'center'}}
              sx={{minWidth: '300px'}}
    >
      <Alert onClose={handleNotificationClose}
             severity={notificationSeverity}
             sx={{ width: '100%' }}
      >
        {notificationMessage}
      </Alert>
    </Snackbar>
  )
}