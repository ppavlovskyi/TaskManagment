import { Notification } from "../../utils/typed";

export const getUnreadNotifications = async (
  token: string,
  setNotifications: (notifications: Notification[]) => void
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_NOTIFICATION_URL}/notifications`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Other error");
    }
    const data: Notification[] = await response.json();
    setNotifications(data);
  } catch (error: any) {
    setNotifications([]);
  }
};
