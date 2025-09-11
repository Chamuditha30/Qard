import { Redirect } from "expo-router";
import { useEffect } from "react";
import {
  createNotificationChannel,
  requestNotificationPermissions,
} from "../src/helpers/notificationHelpers";

export default function Index() {
  //request notification permissions
  useEffect(() => {
    const notifications = async () => {
      await requestNotificationPermissions();
      await createNotificationChannel();
    };
    notifications();
  }, []);

  return <Redirect href="(tabs)/Cards" />;
}
