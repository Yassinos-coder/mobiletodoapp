import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppRoutes from "./Navigation/AppRoutes";


export default function App() {

  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}
