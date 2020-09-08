import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot } from "recoil/dist";
import { MenuProvider } from "react-native-popup-menu";
import RootStack from "./src/components/Navigation/RootStack";

export default function App() {
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
