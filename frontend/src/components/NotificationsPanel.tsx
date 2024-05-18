import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { io, Socket } from "socket.io-client";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
interface Notification {
  _id: string;
  details: string;
  dateTime: string;
  isUnread: boolean;
}

const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_NOTIFICATION_URL}`);
    socketRef.current = socket;

    socket.on(
      "notification",
      (data: { action: string; notification: Notification }) => {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          data.notification,
        ]);
      }
    );

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const unreadNotifications = notifications.filter(
      (notification) => notification.isUnread
    ).length;
    setUnreadCount(unreadNotifications);
  }, [notifications]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification._id === notificationId
          ? { ...notification, isUnread: false }
          : notification
      )
    );

    fetch(
      `${process.env.REACT_APP_NOTIFICATION_URL}/notifications/${notificationId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
  const handleDelete = (notificationId: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification._id !== notificationId
      )
    );

    // fetch(`${process.env.REACT_APP_NOTIFICATION_URL}/notifications/${notificationId}`, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
  };

  return (
    <Box>
      <IconButton color="inherit" onClick={handleMenuOpen}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        keepMounted
      >
        {notifications.map((notification) => (
          <MenuItem key={notification._id}>
            <Typography variant="body2" style={{ flexGrow: 1 }}>
              {notification.details}
              <br />
              <small>{new Date(notification.dateTime).toLocaleString()}</small>
            </Typography>
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleMarkAsRead(notification._id)}
            >
              <CheckIcon />
            </IconButton>
            <IconButton
              size="small"
              color="secondary"
              onClick={() => handleDelete(notification._id)}
            >
              <DeleteIcon />
            </IconButton>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default NotificationsPanel;
