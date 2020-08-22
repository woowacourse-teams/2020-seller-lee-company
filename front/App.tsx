import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot } from "recoil/dist";
import { MenuProvider } from "react-native-popup-menu";
import AppStackNavigation from "./src/components/Navigation/AppStackNavigation";

console.disableYellowBox = true;

export default function App() {
  return (
    <RecoilRoot>
      <MenuProvider>
        <NavigationContainer>
          <AppStackNavigation />
        </NavigationContainer>
      </MenuProvider>
    </RecoilRoot>
  );
}
