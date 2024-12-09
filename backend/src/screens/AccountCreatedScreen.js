import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";

const AccountCreatedScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.message}>Account Successfully Created!</Text>
    <Button title="Next" onPress={() => navigation.navigate("Verification")} />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  message: { fontSize: 20, marginBottom: 20, textAlign: "center", fontWeight: "bold" },
});

export default AccountCreatedScreen;
