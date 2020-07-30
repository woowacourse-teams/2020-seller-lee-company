/**
 * @author kouz95
 */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot } from "recoil/dist";
import ImageSliderNavigation from "./src/components/ImageSliderNavigation";

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <ImageSliderNavigation />
      </NavigationContainer>
    </RecoilRoot>
  );
}
