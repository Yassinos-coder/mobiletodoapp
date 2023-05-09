import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

function Home({ navigation }) {
  const [session, setSession] = useState(false);

  useEffect( () => {
    async () => {
      if ((await AsyncStorage.getItem("isConnected")) === "1") {
        setSession(true);
      } else {
        setSession(false);
      }
    };
  }, []);

  return (
    <SafeAreaView style={styles.Home}>
      <View>
        <Image
          source={require("../../assets/icon.png")}
          style={styles.logoHome}
        />
        <Text style={styles.titleHome}>
          Welcome to <Text style={styles.titleWord}>The Organizer</Text>
        </Text>
        <View style={styles.actionsView}>
          <TouchableOpacity
            style={styles.SignUp}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.LogIn}
            onPress={() => navigation.navigate(session ? 'Dashboard' : 'Login')}
          >

            <Text style={styles.buttonText}>{session ? 'Dashboard' : 'Login'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Home: {
    flex: 1,
    backgroundColor: "white",
  },

  logoHome: {
    width: 200,
    height: 200,
    marginTop: 100,
    marginLeft: 90,
  },

  titleHome: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 50,
  },

  titleWord: {
    color: "#2c96ff",
    fontWeight: "900",
  },

  actionsView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 50,
    marginLeft: 15,
    maxWidth: 350,
    alignItems: "center",
  },

  SignUp: {
    fontSize: 30,
    backgroundColor: "#2c96ff",
    color: "white",
    borderRadius: 5,
    padding: 7,
    width: 150,
  },

  LogIn: {
    fontSize: 30,
    backgroundColor: "#2c96ff",
    color: "white",
    borderRadius: 5,
    padding: 7,
    width: 150,
  },

  buttonText: {
    fontSize: 30,
    color: "#fff",
    textAlign: "center",
  },
});

export default Home;
