import React from 'react';
import { Button, StyleSheet, Text, View} from "react-native";
import { router } from 'expo-router';
import MyLogin from './login.js';


export default function Page() {
  return (


    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Login</Text>
        <MyLogin/>
      </View>
    </View>
  );


};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});


