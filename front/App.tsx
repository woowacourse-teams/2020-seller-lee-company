import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import CategoryNavigation from "./src/components/CategoryNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <CategoryNavigation />
    </NavigationContainer>
  );
}
