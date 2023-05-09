import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Button,
  Provider,
  Stack,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  TextInput,
} from "@react-native-material/core";
import TodoModal from "../../Modals/TodoModal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AddTodo, getUserTodos } from "../../redux/TodoReducer";
import { useEffect } from "react";
import TodoBar from "../../Components/TodoBar";

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const userTodoList = useSelector((state) => state.TodoReducer.userTodos);
  const [visibleTodoAdd, setVisibleTodoAdd] = useState(false);
  const [showTimePicker, setshowTimePicker] = useState(false);
  const userData = useSelector((state) => state.UserReducer.userData);
  const userFirstname = userData.flname
    ? userData.flname.split(" ")[0]
    : "error";
  const date = new Date();
  const TodayDate = date.toLocaleDateString("en-GB");
  const [newTodo, setNewTodo] = useState(new TodoModal());
  const uuid = AsyncStorage.getItem("uuid");

  useEffect(() => {
    dispatch(getUserTodos({ uuid: userData._id }));
  }, []);

  const handleTimePick = (event) => {
    const timestamp = event.nativeEvent.timestamp;
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    setNewTodo({ ...newTodo, due_at: `${hours}:${minutes}` });
    setshowTimePicker(false);
  };

  const sendNewTodo = () => {
    dispatch(AddTodo({ newTodoData: newTodo })).then((data) => {
      if (data.payload.message === "error") {
        alert("Error performing this task. Please try again !");
      }
      setNewTodo({ ...newTodo, due_at: "" });
    });
    setVisibleTodoAdd(false);
  };

  return (
    <Provider>
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
        <View style={DashboardStyles.todoView}>
          <View style={DashboardStyles.todoHeader}>
            <Text style={DashboardStyles.todayDate}>{TodayDate}</Text>
            <Button
              title="Add Todo"
              style={DashboardStyles.addTodoBtn}
              onPress={() => {
                setVisibleTodoAdd(true);
              }}
            />
          </View>
          <View style={DashboardStyles.todoAddDialog}>
            <Dialog visible={visibleTodoAdd}>
              <DialogHeader title="Add Todo" />
              <DialogContent>
                <Stack spacing={2}>
                  <Text>Please write down today'S task.</Text>
                  <TextInput
                    label="Task"
                    onChangeText={(text) => {
                      setNewTodo({
                        ...newTodo,
                        task: text,
                        created_at: TodayDate,
                        ownerID: uuid._j,
                      });
                    }}
                  />
                  {showTimePicker && (
                    <DateTimePicker
                      mode="time"
                      value={new Date(1598051730000)}
                      is24Hour={true}
                      onChange={(event) => {
                        handleTimePick(event);
                      }}
                    />
                  )}
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button
                  title="Cancel"
                  compact
                  variant="text"
                  onPress={() => setVisibleTodoAdd(false)}
                  titleStyle={{ color: "red" }}
                />
                <Button
                  title={newTodo.due_at === "" ? "Pick due time" : "Add Todo"}
                  compact
                  variant="text"
                  onPress={() => {
                    if (newTodo.due_at === "") {
                      setshowTimePicker(true);
                    } else {
                      sendNewTodo();
                    }
                  }}
                  titleStyle={{ color: "#2c96ff" }}
                  disabled={newTodo.task === "" ? true : false}
                  disabledStyle={{ color: "grey" }}
                />
              </DialogActions>
            </Dialog>
          </View>
          <View style={DashboardStyles.todoSpace}>
            {userTodoList.length === 0 ? (
              <Text style={DashboardStyles.noTodo}>Task list is empty {"\n"} Create a task 📝!</Text>
            ) : (
              userTodoList.map((todo, index) => (
                <TodoBar
                  key={index}
                  taskData={todo}
                  indexKey={index}
                  task={todo.task}
                  created_at={todo.created_at}
                  due_at={todo.due_at}
                />
              ))
            )}
          </View>
        </View>
      </SafeAreaView>
    </Provider>
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
    flexDirection: "row",
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
    // position: "relative",
    backgroundColor: "red",
    width: 100,
    height: 70,
    // top: -50,
    // left: 300,
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
  todoView: {
    position: "relative",
    top: 20,
  },
  todoHeader: {
    backgroundColor: "#FFFCF2",
    position: "relative",
    top: 10,
    left: 10,
    width: 365,
    borderRadius: 50,
    height: 70,
  },
  todayDate: {
    fontSize: 25,
    fontWeight: "600",
    left: 10,
    lineHeight: 65,
  },
  addTodoBtn: {
    position: "absolute",
    backgroundColor: "#2c96ff",
    width: 120,
    top: 15,
    left: 220,
    height: 35,
  },
  todoAddDialog: {},
  todoSpace: {
    position: "relative",
    left: 10,
    top: 50,
    width: 365,
  },
  noTodo : {
    textAlign: 'center',
    fontSize: 30,
    color: 'grey',
    lineHeight: 45,
    marginTop: 50,
  },
});
