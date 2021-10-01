import React, { useState } from 'react';
import {Alert, StyleSheet, View} from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';



export interface EditTaskArgs {
    taskId: number,
    taskNewTitle: string,
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

      const existTask = tasks.find(element => element.title === newTaskTitle);

      if(!existTask) {
          const newTask = {
              id: new Date().getTime(),
              title: newTaskTitle,
              done: false,
          }
          setTasks([...tasks, newTask]);
      }else {

          Alert.alert("Task já cadastrada",
              "Você não pode cadastrar uma task com o mesmo nome")
      }

    //TODO - add new task
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists

          const tasksUpdated = tasks.map(task => (task.id === id) ?
              ({...task, done: !task.done }) : ({...task}))

          setTasks(tasksUpdated);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state

      Alert.alert("Remover Item",
          "Tem certeza que você deseja remover esse item?",
          [
              {
              text: "Não",
              style: "cancel",
             },
              {
                  text: "Sim",
                  onPress: () =>
                      setTasks([...tasks.filter(filter => filter.id !== id)])
              }
          ],
          {
              cancelable: true
          }
      )


  }

  function handleEditTask({taskId, taskNewTitle}: EditTaskArgs ) {

      const updatedTasks = tasks.map(task => ({...task}));

      const taskToBeUpdated = updatedTasks.find(task=> task.id === taskId);

      if(!taskToBeUpdated)
          return;

      taskToBeUpdated.title = taskNewTitle;

      setTasks(updatedTasks);

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
