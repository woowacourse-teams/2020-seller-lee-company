/**
 * @author kouz95
 */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot } from "recoil/dist";
import BottomTabNavigation from "./src/components/BottomTabNavigation";

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <BottomTabNavigation />
      </NavigationContainer>
    </RecoilRoot>
  );
}
