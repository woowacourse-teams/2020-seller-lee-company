/**
 * @author kouz95
 */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot } from "recoil/dist";
import AppStackNavigation from "./src/components/Navigation/AppStackNavigation";

console.disableYellowBox = true;

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <AppStackNavigation />
      </NavigationContainer>
    </RecoilRoot>
  );
}
