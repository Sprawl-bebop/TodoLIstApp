import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Pressable, Alert, Modal, TextInput, Button, FlatList, Keyboard } from "react-native";
import { Float, Int32 } from "react-native/Libraries/Types/CodegenTypes";

var dismissKeyboard = require('dismissKeyboard');

const taskList = [
  {
    id: 1,
    taskName: "clean",
    status:"incomplete"
  },
  {
    id: 2,
    taskName: "wash"
  },
  {
    id: 3,
    taskName: "cook"
  },
  {
    id: 4,
    taskName: "study"
  },

]

// const arr = [0];
// let i = 0;

const Item = (props: any) => {

  return (

    //arr.includes(props.id)
    <View style={props.isDisabled ? styles.divStyle2Completed : styles.divStyle2}>
      <Text style={styles.textTask}>{props.title}</Text>
      {/* <Pressable
      style={{backgroundColor:"#05696b"}}
    >
      <Text style={{fontSize:15, color:"white", textTransform:"uppercase", textAlign:"center", padding:10}}>Task Completed</Text>
    </Pressable> */}

      {/* disabled={props.Selected?.id == props.id } */}
      {/* arr.includes(props.id)?true:false */}
      <Button title="Task Completed" color={"#05696b"} disabled={props.isDisabled} onPress={props.handleClick} />
    </View>
  );
};


const App = () => {


  const [Selected, setSelected] = useState<any>(null)
  const [CompletedTask, setCompletedTask] = useState(0);

  // const [text, setText] = useState('');

  const [task, setTask] = useState('');
  const [myTaskList, setTaskList] = useState(taskList);
  const [completedIds,setCompletedIds] = useState<any>([])


  // const setArray = (value: number) => {
  //   arr.push(value)
  // };


  return (
    <View style={{ flex: 1, backgroundColor: "#e5f1ee" }}>

      <View style={[styles.divStyle, { backgroundColor: "#8bd0dd" }]}>
        <Text style={styles.textStyl}>Total Tasks: {myTaskList.length}</Text>
        <Text style={styles.textStyl}>Completed Tasks: {CompletedTask}</Text>
      </View>

      <View style={[styles.divStyle]}>
        <View style={{ height: 45, justifyContent: "center", flexDirection: "row" }}>
          <TextInput placeholder="Enter task" style={{ flex: 2, borderColor: "grey", borderWidth: 1, marginRight: 10 }} 
           onChangeText={(task)=> {
              setTask(task)
              
          }}></TextInput>

          <Button title="Add Task" onPress={() => {
            if(task!=""){
              let newItem = {
                id: taskList.length + 1,
                taskName: task
              }

              setTaskList([
                newItem,
                ...myTaskList,
  
              ])

              Keyboard.dismiss();

            }else{
              Alert.alert("Empty String")
              Keyboard.dismiss();
            }


          }} />
        </View>
      </View>

      <View>
        <FlatList
          data={myTaskList}
          renderItem={({ item }:any) => <Item
            // isSelected={Selected?.id == item.id}
            title={item.taskName}
            isDisabled = {completedIds.includes(item.id)}
            id={item.id}

            handleClick={() => {
              // const tracker = CompletedTask

              // setSelected(item)
              // setCompletedTask(CompletedTask+1)


              // setArray(item.id)
              // console.warn(arr)
              // setCompletedIds([...completedIds,id])
              setCompletedIds([...completedIds,item.id])

              // if (taskList.length == CompletedTask) {
              if(myTaskList.length == CompletedTask ){
                setCompletedTask(0);
                Alert.alert("All Task Completed")
                // for (i; i < arr.length; i++) {
                //   arr.splice(i)
                // }
              } else {
                setCompletedTask(CompletedTask + 1)
              }

            }}
          />}
        // keyExtractor={item => item.id}
        />
      </View>


    </View>
  )
};

const styles = StyleSheet.create({
  textStyl: {
    fontSize: 20,
    fontWeight: "600",
    color: "black",
  },
  divStyle: {
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    padding: 7,
    borderRadius: 10
  },
  divStyle2: {
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    padding: 7,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#8bd0dd"
  },
  divStyle2Completed: {
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    padding: 7,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "red"
  },
  textTask: {
    flex: 2,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    color: "blue",
    backgroundColor: "coral",
    textTransform: "uppercase"
  }
});

export default App;
