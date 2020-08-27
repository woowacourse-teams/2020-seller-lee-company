import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot } from "recoil/dist";
import { MenuProvider } from "react-native-popup-menu";
import AppStack from "./src/components/Navigation/AppStack";

console.disableYellowBox = true;

export default function App() {
  return (
    <RecoilRoot>
      <MenuProvider>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </MenuProvider>
    </RecoilRoot>
  );
}
