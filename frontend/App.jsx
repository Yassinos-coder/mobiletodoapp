import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppRoutes from "./Navigation/AppRoutes";
import { Provider } from "react-redux";
import Store from "./redux/Store";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Provider store={Store}>
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </Provider>
    </>
  );
}
