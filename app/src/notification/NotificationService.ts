import { NOTIFICATION_CONTAINER, NOTIFICATION_TYPE, Store } from "react-notifications-component";

export class NotificationService {
  static add(message: string, container: NOTIFICATION_CONTAINER, type: NOTIFICATION_TYPE = "default", duration: number = 2000) {
    Store.addNotification({
      message,
      container,
      type,
      dismiss: {
        duration,
        onScreen: true
      }
    });
  }
}