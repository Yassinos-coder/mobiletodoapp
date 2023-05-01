import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

function Home() {
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
          <TouchableOpacity style={styles.SignUp}>
            <Text style={{fontSize: 30, color:'#fff', textAlign:'center'}}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.LogIn}>
            <Text style={{fontSize: 30, color:'#fff', textAlign:'center'}}>Log In</Text>
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
    marginLeft: 90,
  },
  titleHome: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 50,
  },
  titleWord: {
    color: "red",
    fontWeight: "900",
  },
  actionsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
    marginLeft: 15,
    maxWidth: 350,
    alignItems: 'center',
  },
  SignUp : {
    fontSize: 30,
    backgroundColor: "grey",
    color: 'white',
    borderRadius: 5,
    padding: 7,
    width: 150,
  },
  LogIn : {
    fontSize: 30,
    backgroundColor: "grey",
    color: 'white',
    borderRadius: 5,
    padding: 7,
    width: 150,
  },
});

export default Home;
