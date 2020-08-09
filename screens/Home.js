//original
// import React, { useEffect, useState } from "react"

//redux
// import React, { useEffect } from "react"

//Context API
import React, { useEffect, useContext } from "react"

import { StyleSheet, Text, View, Image, FlatList, Alert } from "react-native"
import { Card, FAB } from "react-native-paper"

//redux
// import { useSelector, useDispatch } from "react-redux"

//Context API
import { Mycontext } from "../AppContext"

const Home = ({ navigation }) => {
  //original
  // const [data, setData] = useState([])
  // const [loading, setLoading] = useState(true)

  //redux
  // const dispatch = useDispatch()
  // const { data, loading } = useSelector((state) => {
  //   return state
  // })

  //ContextAPI
  const { state, dispatch } = useContext(Mycontext)
  const { data, loading } = state

  const fetchData = () => {
    fetch("http://10.0.2.2:3000/")
      .then((res) => res.json())
      .then((results) => {
        // setData(results)
        // setLoading(false)
        dispatch({ type: "ADD_DATA", payload: results })
        dispatch({ type: "SET_LOADING", payload: false })
      })
      .catch((err) => {
        Alert.alert("Something went wrong")
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const renderList = (item) => {
    return (
      <Card
        style={styles.mycard}
        onPress={() => {
          navigation.navigate("Profile", { item })
        }}
      >
        <View style={styles.cardView}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
            source={{
              uri: item.picture
            }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.position}</Text>
          </View>
        </View>
      </Card>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return renderList(item)
        }}
        keyExtractor={(item) => item._id}
        onRefresh={() => fetchData()}
        refreshing={loading}
      />
      <FAB
        style={styles.fab}
        small={false}
        icon="plus"
        theme={{ colors: { accent: "#006aff" } }}
        onPress={() => navigation.navigate("Create")}
      />
    </View>
  )
}

//prov_ides suggestion and error checking
const styles = StyleSheet.create({
  mycard: {
    margin: 5
  },
  cardView: {
    flexDirection: "row",
    padding: 6
  },
  text: {
    fontSize: 18
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0
  }
})

//does not have suggestion and error checking
// const styles ={
//   mycard: {
//     margin: 5,
//     padding: 5
//   }
// }

export default Home
