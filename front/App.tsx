/**
 * @author kouz95
 */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot } from "recoil/dist";
import BottomTabNavigation from "./src/components/Navigation/BottomTabNavigation";

console.disableYellowBox = true;

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <BottomTabNavigation />
      </NavigationContainer>
    </RecoilRoot>
  );
}
