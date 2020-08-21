import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot } from "recoil/dist";
import { MenuProvider } from "react-native-popup-menu";
import { DeviceStorage } from "./src/auth/DeviceStorage";
import { AppLoading } from "expo";
import BottomTabNavigation from "./src/components/Navigation/BottomTabNavigation";
import AppStackNavigation from "./src/components/Navigation/AppStackNavigation";

console.disableYellowBox = true;

export default function App() {
  const [hasToken, setHasToken] = useState({
    tokenState: false,
    isLoading: false,
  });

  DeviceStorage.getToken().then((data) => {
    setHasToken({
      tokenState: data !== null,
      isLoading: true,
    });
  });

  if (!hasToken.isLoading) {
    console.log("---AppLoading Start---");
    return <AppLoading />;
  } else {
    return (
      <RecoilRoot>
        <MenuProvider>
          <NavigationContainer>
            {hasToken.tokenState ? (
              <BottomTabNavigation />
            ) : (
              <AppStackNavigation />
            )}
          </NavigationContainer>
        </MenuProvider>
      </RecoilRoot>
    );
  }
}
