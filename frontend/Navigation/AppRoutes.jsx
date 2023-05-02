import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home/Home';
import Login from '../Screens/Login/Login';
import Signup from '../Screens/Signup/Signup';

const Stack = createStackNavigator();

const AppRoutes = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} options={{title: null}}/>
      <Stack.Screen name='Login' component={Login}  options={{title: null, headerLeft: null}}/>
      <Stack.Screen name='Signup' component={Signup}  options={{title: null, headerLeft: null}}/>
    </Stack.Navigator>
  );
};

export default AppRoutes;
