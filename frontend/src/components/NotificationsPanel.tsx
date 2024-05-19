import React, { useEffect, useRef, useState } from "react";
import { Box, Badge, IconButton, Menu, MenuItem, Typography, Button, Switch, FormControlLabel, styled, SwitchProps } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { io, Socket } from "socket.io-client";


const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

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
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (notificationsEnabled) {
      const socket = io(`${process.env.REACT_APP_NOTIFICATION_URL}`);
      socketRef.current = socket;

      socket.on("notification", (data: { action: string; notification: Notification }) => {
        setNotifications((prevNotifications) => [...prevNotifications, data.notification]);
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    } else {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    }
  }, [notificationsEnabled]);

  useEffect(() => {
    const unreadNotifications = notifications.filter(notification => notification.isUnread).length;
    setUnreadCount(unreadNotifications);
  }, [notifications]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification._id === notificationId ? { ...notification, isUnread: false } : notification
      )
    );

    fetch(`${process.env.REACT_APP_NOTIFICATION_URL}/notifications/${notificationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    handleDelete(notificationId)
  };

  const handleDisableNotifications = () => {
    setNotificationsEnabled(prev => !prev);
  };
  const handleDelete = (notificationId: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification._id !== notificationId
      )
    );

  };

  return (
    <Box>
      <IconButton sx={{marginX: "20px"}} color="inherit" onClick={handleMenuOpen}>
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
        {notifications.map(notification => (
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
      <FormControlLabel
        control={<IOSSwitch sx={{ m: 1 }} checked={notificationsEnabled} onChange={handleDisableNotifications} />}
        label="Notifications"
      />
    </Box>
  );
};

export default NotificationsPanel;





