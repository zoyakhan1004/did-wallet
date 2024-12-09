import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// Custom Button Component
import Button from "../components/Button";

const WelcomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to DID Mobile Wallet</Text>
    <Text style={styles.subtitle}>Your digital identity, secured and trusted</Text>

    {/* Register Button */}
    <Button title="Register as Individual" onPress={() => navigation.navigate("Register")} style={styles.button} />

    {/* Login Button */}
    <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.loginLink}>
      <Text style={styles.loginText}>Already have an account? Login</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F4F9", // Light background for a clean look
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6200EE", // Bright and eye-catching color for the title
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#333", // Dark text for better readability
    textAlign: "center",
    marginBottom: 40,
    fontStyle: "italic", // Adds emphasis to the subtitle
  },
  button: {
    backgroundColor: "#6200EE", // Purple button background for consistency
    width: "100%", // Full width button
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  loginLink: {
    marginTop: 20,
  },
  loginText: {
    color: "#6200EE", // Blue text to make the login link stand out
    fontSize: 16,
    fontWeight: "600", // Slightly bolder to grab attention
    textDecorationLine: "underline", // Underline the link for better UX
  },
});

export default WelcomeScreen;
