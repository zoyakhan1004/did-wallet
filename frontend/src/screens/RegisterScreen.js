import React, { useState } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import InputField from "../components/InputField";
import Button from "../components/Button";
const RegisterScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleSendOtp = async () => {
    try {
      if (!form.email || !form.firstName || !form.lastName) {
        Alert.alert("Error", "Please fill all fields");
        return;
      }

      const response = await fetch(
        `https://8e61-110-227-204-245.ngrok-free.app/api/authMiddleware/send-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            firstName: form.firstName,
            lastName: form.lastName,
          }),
        }
      );

      const data = response.headers.get("content-type")?.includes("application/json")
        ? await response.json()
        : {};

      if (response.ok) {
        setOtpSent(true);
        Alert.alert("Success", "OTP sent to your email");
      } else {
        Alert.alert("Error", data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      Alert.alert("Error", "Connection failed. Please try again.");
    }
  };

  const handleRegister = async () => {
    try {
      if (form.password !== form.confirmPassword) {
        Alert.alert("Error", "Passwords do not match!");
        return;
      }

      if (!form.otp) {
        Alert.alert("Error", "Please enter OTP");
        return;
      }

      setLoading(true);

      // Registration API call
      const response = await fetch(
        `https://8e61-110-227-204-245.ngrok-free.app/api/authMiddleware/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            password: form.password,
            otp: form.otp,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Account successfully created!");
        navigation.navigate("AccountCreated");
      } else {
        Alert.alert("Error", data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Alert.alert("Error", "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      {!otpSent ? (
        <>
          <InputField
            placeholder="First Name"
            value={form.firstName}
            onChangeText={(text) => handleChange("firstName", text)}
          />
          <InputField
            placeholder="Last Name"
            value={form.lastName}
            onChangeText={(text) => handleChange("lastName", text)}
          />
          <InputField
            placeholder="Email"
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
          />
          <Button title="Send OTP" onPress={handleSendOtp} />
        </>
      ) : (
        <>
          <InputField
            placeholder="New Password"
            value={form.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry
          />
          <InputField
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
            secureTextEntry
          />
          <InputField
            placeholder="Enter OTP"
            value={form.otp}
            onChangeText={(text) => handleChange("otp", text)}
          />
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <Button title="Register & Create DID" onPress={handleRegister} />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
});

export default RegisterScreen;
