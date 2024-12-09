import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
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

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleSendOtp = () => {
    // Mock sending OTP
    setOtpSent(true);
    Alert.alert("OTP Sent", "A verification code has been sent to your email.");
  };

  const handleRegister = () => {
    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }
    if (!form.otp || form.otp !== "1234") { // Replace with actual OTP validation
      Alert.alert("Error", "Invalid OTP!");
      return;
    }
    Alert.alert("Success", "Account successfully created!");
    navigation.navigate("AccountCreated");
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
          <Button title="Register" onPress={handleRegister} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
});

export default RegisterScreen;
