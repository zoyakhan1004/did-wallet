import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from "../components/InputField.js";
import Button from "../components/Button.js";
import { authMiddlewareService } from "../services/authMiddlewareService.js";

const LoginScreen = ({ navigation }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const validateForm = () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
  
    try {
      setLoading(true);
      const response = await authMiddlewareService.login({
        email: form.email.trim(),
        password: form.password
      });
      console.log("🚀 ~ handleLogin ~ response:", response);
  
      if (response.token && response.userId) {
        // Store userToken and userId
        await AsyncStorage.multiSet([
          ['userToken', response.token],
          ['userId', response.userId]
        ]);
  
        Alert.alert(
          "Success",
          "Logged in successfully!",
          [
            {
              text: "OK",
              onPress: () => navigation.replace("Home"),
            }
          ]
        );
      } else {
        Alert.alert("Error", response.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert(
        "Error",
        "Connection failed. Please check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <InputField
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <InputField
        placeholder="Password"
        value={form.password}
        onChangeText={(text) => handleChange("password", text)}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button 
        title={loading ? "Logging in..." : "Login"} 
        onPress={handleLogin}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    justifyContent: "center",
    backgroundColor: '#fff'
  },
});

export default LoginScreen;