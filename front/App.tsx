import React from "react";
import BottomTabNavigation from "./src/components/BottomTabNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot } from "recoil/dist";

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <BottomTabNavigation />
      </NavigationContainer>
    </RecoilRoot>
  );
}
