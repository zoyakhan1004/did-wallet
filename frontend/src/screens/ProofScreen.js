// src/screens/ProofScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { polygonIdService } from "../services/polygonIdService";

const ProofScreen = ({ route, navigation }) => {
  const { credential } = route.params; // Pass credential from the previous screen
  const [proofRequest, setProofRequest] = useState("");
  const [loading, setLoading] = useState(false);
  const [proof, setProof] = useState(null);

  const handleGenerateProof = async () => {
    if (!proofRequest) {
      Alert.alert("Error", "Please enter a valid proof request.");
      return;
    }

    try {
      setLoading(true);
      const generatedProof = await polygonIdService.generateProof(credential, proofRequest);
      setProof(generatedProof);
      Alert.alert("Success", "Proof generated successfully.");
    } catch (error) {
      console.error("Error generating proof:", error);
      Alert.alert("Error", "Failed to generate proof.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Generate Zero-Knowledge Proof</Text>
      <Text style={styles.label}>Credential:</Text>
      <Text style={styles.credentialText}>{credential.type}</Text>

      <Text style={styles.label}>Proof Request:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter proof request"
        value={proofRequest}
        onChangeText={setProofRequest}
      />

      <TouchableOpacity style={styles.button} onPress={handleGenerateProof}>
        <Text style={styles.buttonText}>{loading ? "Generating..." : "Generate Proof"}</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#6200EE" />}
      {proof && (
        <View style={styles.proofContainer}>
          <Text style={styles.proofHeader}>Generated Proof:</Text>
          <Text style={styles.proofText}>{JSON.stringify(proof, null, 2)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6200EE",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginTop: 10,
  },
  credentialText: {
    fontSize: 14,
    color: "#555555",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#6200EE",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  proofContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#e3f2fd",
    borderRadius: 5,
  },
  proofHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },
  proofText: {
    fontSize: 14,
    color: "#555555",
  },
});

export default ProofScreen;
