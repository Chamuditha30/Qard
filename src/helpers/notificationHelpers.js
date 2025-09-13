import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

//request notification permissions
export const requestNotificationPermissions = async () => {
  const permission = await Notifications.requestPermissionsAsync();
  if (!permission.granted) {
    alert("Permission to access notifications is required!");
    return;
  }
};

//create notification handler
export const setNotificationHandler = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
};

//create notification channel
export const createNotificationChannel = async () => {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("qard", {
      name: "Qard Notifications",
      importance: Notifications.AndroidImportance.HIGH,
    });
    console.log("Notification channel created!");
  }
};

//schedule notification
export const scheduleNotification = async (nextReview) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Flashcard Reminder",
      body: "Time to check your memory",
      android: { channelId: "qard" },
    },
    trigger: nextReview,
  });

  console.log(`Notification scheduled for ${nextReview}`);
};

//notification
export const showNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Flashcard Reminder",
      body: "Notification shedule working",
      android: { channelId: "qard" },
    },
    trigger: { date: new Date("2025-09-13T20:43:00Z") },
  });

  console.log("Notification sheduled");
};
