import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot } from "recoil/dist";
import BottomTabNavigation from "./src/components/Navigation/BottomTabNavigation";
import { MenuProvider } from "react-native-popup-menu";

console.disableYellowBox = true;

export default function App() {
  return (
    <RecoilRoot>
      <MenuProvider>
        <NavigationContainer>
          <BottomTabNavigation />
        </NavigationContainer>
      </MenuProvider>
    </RecoilRoot>
  );
}
