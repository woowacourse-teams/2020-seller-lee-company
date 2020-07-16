import React from "react";
import Navigation from "./src/components/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import { RecoilRoot } from "recoil/dist";

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </RecoilRoot>
  );
}
