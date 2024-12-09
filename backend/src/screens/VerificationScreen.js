import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import InputField from "../components/InputField";
import Button from "../components/Button";

const VerificationScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    nationality: "",
    firstName: "",
    middleName: "",
    lastName: "",
    address: "",
    dob: "",
    governmentId: "",
  });

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleVerify = () => {
    // Mock verification process
    Alert.alert("Verification Complete", "You have been successfully verified!");
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <InputField
        placeholder="Nationality"
        value={form.nationality}
        onChangeText={(text) => handleChange("nationality", text)}
      />
      <InputField
        placeholder="First Name"
        value={form.firstName}
        onChangeText={(text) => handleChange("firstName", text)}
      />
      <InputField
        placeholder="Middle Name"
        value={form.middleName}
        onChangeText={(text) => handleChange("middleName", text)}
      />
      <InputField
        placeholder="Last Name"
        value={form.lastName}
        onChangeText={(text) => handleChange("lastName", text)}
      />
      <InputField
        placeholder="Address"
        value={form.address}
        onChangeText={(text) => handleChange("address", text)}
      />
      <InputField
        placeholder="Date of Birth"
        value={form.dob}
        onChangeText={(text) => handleChange("dob", text)}
      />
      <InputField
        placeholder="Government ID (Aadhar, PAN, etc.)"
        value={form.governmentId}
        onChangeText={(text) => handleChange("governmentId", text)}
      />
      <Button title="Verify" onPress={handleVerify} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
});

export default VerificationScreen;
