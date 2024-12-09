import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import InputField from "../components/InputField";
import Button from "../components/Button";

const LoginScreen = ({ navigation }) => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleLogin = () => {
    const { email, password } = form;

    // Simple check for email and password
    if (email === "abc" && password === "abc") {
      // If login is successful, navigate to the ConnectionsScreen
      alert("Logged in successfully!");
      navigation.navigate("Home");
    } else {
      // If login fails, show an error message
      Alert.alert("Error", "Invalid email or password");
    }
  };

  return (
    <View style={styles.container}>
      <InputField
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      <InputField
        placeholder="Password"
        value={form.password}
        onChangeText={(text) => handleChange("password", text)}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
});

export default LoginScreen;
