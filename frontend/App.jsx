import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppRoutes from "./Navigation/AppRoutes";
import { Provider } from "react-redux";
import Store from "./redux/Store";

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </Provider>
  );
}
