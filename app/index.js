import { useQuery } from "@realm/react";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import {
  createNotificationChannel,
  requestNotificationPermissions,
  setNotificationHandler,
} from "../src/helpers/notificationHelpers";
import { Card } from "../src/models/models";

export default function Index() {
  //request notification permissions
  useEffect(() => {
    const notifications = async () => {
      setNotificationHandler();
      await requestNotificationPermissions();
      await createNotificationChannel();
    };
    notifications();
  }, []);

  //get all cards for review check it empty or not for navigate
  const now = new Date();
  const cards = useQuery(Card).filtered("nextReview <= $0", now);
  const tab = cards > 0 ? "Cards" : "Decks";

  return <Redirect href={`(tabs)/${tab}`} />;
}
