import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";

const AddCustomNetworkScreen = () => {
  // State to store input values
  const [chainId, setChainId] = useState("");
  const [blockchain, setBlockchain] = useState("");
  const [network, setNetwork] = useState("");
  const [rpcUrl, setRpcUrl] = useState("");
  const [stateContractAddress, setStateContractAddress] = useState("");
  const [networkFlag, setNetworkFlag] = useState("");

  const handleAddNetwork = async () => {
    const networkData = {
        chainId,
        blockchain,
        network,
        rpcUrl,
        stateContractAddress,
        networkFlag,
    };
    console.log("🚀 ~ handleAddNetwork ~ networkData:", networkData)

    try {
        const response = await fetch('https://7731-110-227-204-245.ngrok-free.app/api/network/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(networkData),
        });
        console.log("🚀 ~ handleAddNetwork ~ response:", response)

        const data = await response.json();

        if (response.ok) {
            Alert.alert("Success", "Network added successfully!");
        } else {
            Alert.alert("Error", data.message || "Failed to add network");
        }
    } catch (error) {
        console.error('Error adding network:', error);
        Alert.alert("Error", "Failed to add network");
    }
  };
  console.log("🚀 ~ handleAddNetwork ~ handleAddNetwork:", handleAddNetwork)
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Adding Custom Network</Text>

      {/* Chain ID */}
      <TextInput
        style={styles.input}
        placeholder="Chain ID"
        value={chainId}
        onChangeText={setChainId}
        keyboardType="numeric"
      />

      {/* Blockchain */}
      <TextInput
        style={styles.input}
        placeholder="Blockchain"
        value={blockchain}
        onChangeText={setBlockchain}
      />

      {/* Network */}
      <TextInput
        style={styles.input}
        placeholder="Network"
        value={network}
        onChangeText={setNetwork}
      />

      {/* RPC URL */}
      <TextInput
        style={styles.input}
        placeholder="RPC URL"
        value={rpcUrl}
        onChangeText={setRpcUrl}
      />

      {/* State Contract Address */}
      <TextInput
        style={styles.input}
        placeholder="State Contract Address"
        value={stateContractAddress}
        onChangeText={setStateContractAddress}
      />

      {/* Network Flag */}
      <TextInput
        style={styles.input}
        placeholder="Network Flag"
        value={networkFlag}
        onChangeText={setNetworkFlag}
      />

      {/* Add Network Button inside a box */}
      <TouchableOpacity style={styles.buttonBox} onPress={handleAddNetwork}>
        <Text style={styles.buttonText}>Add Network</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6200EE",
    marginBottom: 20,
    marginTop: -200,
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    fontSize: 16,
  },
  buttonBox: {
    width: "100%",
    padding: 16,
    marginTop: 20,
    backgroundColor: "#6200EE",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddCustomNetworkScreen;