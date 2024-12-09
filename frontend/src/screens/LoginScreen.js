import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from "../components/InputField";
import Button from "../components/Button";
import { authMiddlewareService } from "../services/authMiddlewareService";

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
  
        // Fetch DID from the backend after successful login
        // const didResponse = await fetch('https://917b-110-227-204-245.ngrok-free.app/api/getDid', {
        //   method: 'GET',
        //   headers: {
        //     Authorization: `Bearer ${response.token}`, // Assuming token is used for authentication
        //   },
        // });
  
        // if (!didResponse.ok) {
        //   throw new Error("Failed to fetch DID");
        // }
  
        // const didData = await didResponse.json();
        // console.log("🚀 ~ handleLogin ~ didData:", didData);
  
        // // Store DID in AsyncStorage
        // if (didData && didData.did) {
        //   await AsyncStorage.setItem('userDID', didData.did);
        // } else {
        //   console.warn("DID not found in response");
        // }
  
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