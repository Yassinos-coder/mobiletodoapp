import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Stack, TextInput } from "@react-native-material/core";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { AddUser } from "../../redux/UserReducer";
import SignUpModal from "../../Modals/SignUpModal";

const Signup = ({navigation}) => {
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState(new SignUpModal());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDatePicker = (event, selectedDate) => {
    setNewUser({ ...newUser, birthday: selectedDate.toLocaleDateString() });
    setShowDatePicker(false);
  };

  const handleSignUp = () => {
    dispatch(AddUser({newUserData: newUser}))
    setTimeout(() => {
        navigation.navigate('Home')
    }, 2000);
  };

  return (
    <SafeAreaView style={signupStyles.signup}>
      <View style={signupStyles.signupTitleView}>
        <Text style={signupStyles.signupTitle}>Sign Up Screen</Text>
      </View>
      <View style={signupStyles.signupBox}>
        <TextInput
          variant="outlined"
          label="Email Address"
          style={{ margin: 16 }}
          fontSize={20}
          textContentType="emailAddress"
          value={newUser.email}
          onChangeText={(text) => {
            setNewUser({ ...newUser, email: text.toLowerCase() });
          }}
        />
        <TextInput
          variant="outlined"
          label="First Name & Last Name"
          style={{ margin: 16 }}
          fontSize={20}
          textContentType="name"
          value={newUser.flname}
          onChangeText={(text) => {
            setNewUser({ ...newUser, flname: text });
          }}
        />
        <TextInput
          variant="outlined"
          label="Password"
          style={{ margin: 16 }}
          fontSize={20}
          secureTextEntry={true}
          value={newUser.password}
          onChangeText={(password) => {
            setNewUser({ ...newUser, password: password });
          }}
        />
        <Button
          title="Select Birthday"
          onPress={() => {
            setShowDatePicker(true);
          }}
          style={{ width: 200, height: 40, alignSelf: "center" }}
        />
        {showDatePicker && (
          <DateTimePicker
            value={new Date(1598051730000)}
            mode="date"
            onChange={handleDatePicker}
          />
        )}
        <Button
          title="Sign Up"
          onPress={handleSignUp}
          style={{ width: 200, height: 40, alignSelf: "center", marginTop: 10, backgroundColor: 'green'}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const signupStyles = StyleSheet.create({
  signup: {
    flex: 1,
    backgroundColor: "#fff",
  },
  signupTitleView: {
    marginTop: 30,
  },
  signupTitle: {
    fontSize: 30,
    textAlign: "center",
  },
  signupBox: {
    marginTop: 40,
  },
});
