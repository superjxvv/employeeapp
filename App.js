//redux
// import React, { createContext } from "react"

//Context API
import React, { useReducer } from "react"

import { StyleSheet, Text, View } from "react-native"
import Home from "./screens/Home"
import CreateEmployee from "./screens/CreateEmployee"
import Profile from "./screens/Profile"

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

//redux
// import { createStore } from "redux"
// import { Provider } from "react-redux"
// import { reducer } from "./reducers/reducer"

//Context API
import { reducer, initState } from "./reducers/reducer"
import { Mycontext } from "./AppContext"

//redux
// const store = createStore(reducer)

const Stack = createStackNavigator()

const myOptions = {
  title: "Employee List",
  headerTintColor: "white",
  headerStyle: { backgroundColor: "#006aff" }
}
function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={myOptions} />
        <Stack.Screen
          name="Create"
          component={CreateEmployee}
          options={{ ...myOptions, title: "Create Employee" }}
        />
        <Stack.Screen
          name="Update"
          component={CreateEmployee}
          options={{ ...myOptions, title: "Update Employee" }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ ...myOptions, title: "Profile" }}
        />
      </Stack.Navigator>
    </View>
  )
}

export default () => {
  //Context API
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    //redux
    // <Provider store={store}>
    //   <NavigationContainer>
    //     <App />
    //   </NavigationContainer>
    // </Provider>

    //Context API
    <Mycontext.Provider value={{ state, dispatch }}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </Mycontext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e0e0"
  }
})
