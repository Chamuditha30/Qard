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
    trigger: { date: nextReview },
  });

  console.log(`Notification scheduled for ${nextReview}`);
};
