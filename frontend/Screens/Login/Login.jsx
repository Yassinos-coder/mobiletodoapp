import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Stack, TextInput } from "@react-native-material/core";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../redux/UserReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../Components/Loader";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loginCreds, setLoginCreds] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const isUserRequestLoading = useSelector((state) => state.UserReducer.status);

  const handleLogin = () => {
    if (!loginCreds.emailLogin || !loginCreds.password) {
      alert("Email & Password cannot be empty !");
    } else {
      dispatch(LoginUser({ userCreds: loginCreds })).then(async (data) => {
        if (data.payload.giveAccess) {
          try {
            await AsyncStorage.setItem("tokenKey", data.payload.token);
            await AsyncStorage.setItem("uuid", data.payload.user._id);
            await AsyncStorage.setItem(
              "userFullName",
              data.payload.user.flname
            );
            await AsyncStorage.setItem("isConnected", "1");

            navigation.navigate("Dashboard");
          } catch (e) {
            console.log("Error storing token:", e);
          }
        } else {
          alert("Email or Password incorrect. Please Try Again !");
        }
      });
    }
  };

  return (
    <SafeAreaView style={loginStyles.login}>
      <Loader visible={isUserRequestLoading === "pending" ? true : false} />

      <View style={loginStyles.loginTitleView}>
        <Text style={loginStyles.loginTitle}>Login Screen</Text>
      </View>
      <View style={loginStyles.loginInput}>
        <TextInput
          variant="outlined"
          value={userEmail}
          label="Email"
          style={{ margin: 16 }}
          fontSize={20}
          textContentType="emailAddress"
          onChangeText={(text) => {
            setUserEmail(text);
            setLoginCreds({ ...loginCreds, emailLogin: text.toLowerCase() });
          }}
        />
        <TextInput
          variant="outlined"
          label="Password"
          style={{ margin: 16 }}
          fontSize={20}
          secureTextEntry={true}
          value={userPass}
          onChangeText={(password) => {
            setUserPass(password);
            setLoginCreds({ ...loginCreds, password: password });
          }}
        />
        <Stack center>
          <Button
            title="Login"
            style={[loginStyles.loginButton]}
            titleStyle={{ fontSize: 20, paddingTop: 10 }}
            onPress={handleLogin}
          />
        </Stack>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const loginStyles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loginTitleView: {
    marginTop: 100,
  },
  loginTitle: {
    fontSize: 30,
    textAlign: "center",
  },
  loginInput: {
    marginTop: 50,
  },
  loginButton: {
    width: 200,
    height: 50,
    backgroundColor: "#2c96ff",
  },
});
