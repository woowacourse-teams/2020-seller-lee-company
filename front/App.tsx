import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot } from "recoil/dist";
import { MenuProvider } from "react-native-popup-menu";
import RootStack from "./src/components/Navigation/RootStack";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      console.log,
    );
    return () => subscription.remove();
  }, []);

  return (
    <RecoilRoot>
      <MenuProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </MenuProvider>
    </RecoilRoot>
  );
}

console.disableYellowBox = true;
