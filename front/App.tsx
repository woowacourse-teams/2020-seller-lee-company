/**
 * @author kouz95
 */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot } from "recoil/dist";
import ArticleDetailImageSliderNavigation
  from "./src/components/ArticleDetailImageSliderNavigation";

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <ArticleDetailImageSliderNavigation />
      </NavigationContainer>
    </RecoilRoot>
  );
}
