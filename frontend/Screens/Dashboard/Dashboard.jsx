import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import {
  FontAwesomeIcon,
  FontAwesomeIconStyle,
} from "@fortawesome/react-native-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";

const Dashboard = ({ navigation }) => {
  const userData = useSelector((state) => state.UserReducer.userData);
  const userFirstname = userData.flname.split(" ")[0];

  return (
    <SafeAreaView style={DashboardStyles.Dashboard}>
      <View style={DashboardStyles.header}>
        <View style={DashboardStyles.leftSide}>
          <Image
            source={{
              uri:
                userData.avatar === "default.png"
                  ? "http://192.168.3.194:8009/default.png"
                  : `http://192.168.3.194:8009/UsersFolders/${userData.email}/${userData.avatar}`,
            }}
            style={DashboardStyles.userLogoHeader}
          />
          <Text style={DashboardStyles.WelcomeText}>
            {" "}
            Welcome, {userFirstname}{" "}
          </Text>
        </View>
        <View style={DashboardStyles.rightSide}>
          <TouchableOpacity
            style={{ height: 70 }}
            onPress={async () => {
              await AsyncStorage.clear();
              navigation.navigate("Home");
            }}
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={DashboardStyles.faLogOut}
              size={40}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const DashboardStyles = StyleSheet.create({
  Dashboard: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#2c96ff",
    height: 70,
  },
  leftSide: {
    // backgroundColor: 'red',
    width: 300,
    flexDirection: "row",
  },
  userLogoHeader: {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 50,
    height: 50,
    overflow: "hidden",
    top: 10,
    left: 10,
  },
  WelcomeText: {
    position: "relative",
    fontSize: 25,
    color: "#fff",
    top: 15,
    left: 15,
  },
  rightSide: {
    position: "relative",
    backgroundColor: "red",
    width: 85,
    height: 70,
    top: -50,
    left: 300,
    borderLeftColor: "black",
    borderLeftWidth: 2,
  },
  faLogOut: {
    position: "relative",
    fontSize: 10,
    color: "#fff",
    top: 15,
    left: 30,
  },
});
