import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Divider } from "@react-native-material/core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { DeleteTask } from "../redux/TodoReducer";

export default function TodoBar(props) {
    const dispatch = useDispatch()
    const todoTaskData = props.taskData
    const handleTaskDelete = () => {
        dispatch(DeleteTask({uuid: todoTaskData.ownerID, taskID: todoTaskData._id}))
    }

  return (
    <View key={props.indexKey} style={todobarStyles.taskBody}>
      <View style={todobarStyles.header}>
        <Text style={{ fontSize: 15 }}>Created on: {props.created_at}</Text>
        <Text style={{ fontSize: 15, fontWeight: "700" }}>
          Due at: {props.due_at}
        </Text>
      </View>
      <Divider style={{ marginTop: 5 }} leadingInset={32} trailingInset={32} />
      <View style={todobarStyles.todoMain}>
        <Text style={todobarStyles.task}>Task: {props.task} </Text>
      </View>
      <View style={todobarStyles.actionTodo}>
        <TouchableOpacity onPress={handleTaskDelete}>
          <FontAwesomeIcon icon={faTrash} size={20} color="black"/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const todobarStyles = StyleSheet.create({
  taskBody: {
    backgroundColor: "#e6f2ff",
    width: "100%",
    borderRadius: 50,
    height: 90,
    marginBottom: 20,
  },
  header: {
    paddingTop: 10,
    paddingLeft: 20,
    flexDirection: "row",
    gap: 80,
  },
  todoMain: {
    flexDirection: "row",
    paddingTop: 15,
  },
  task: {
    fontSize: 18,
    paddingLeft: 20,
  },
  actionTodo: {
    position: "relative",
    flexDirection: "row",
    gap: 0,
    width: 50,
    left: 320,
    top: -13,
    borderRadius: 50,
  },
});
