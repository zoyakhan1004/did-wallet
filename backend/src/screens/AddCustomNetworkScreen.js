import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

const AddCustomNetworkScreen = () => {
  // State to store input values
  const [chainId, setChainId] = useState("");
  const [blockchain, setBlockchain] = useState("");
  const [network, setNetwork] = useState("");
  const [rpcUrl, setRpcUrl] = useState("");
  const [stateContractAddress, setStateContractAddress] = useState("");
  const [networkFlag, setNetworkFlag] = useState("");

  const handleAddNetwork = () => {
    // Handle the network addition logic here
    // You can send the data to your backend or save it in local storage
    console.log({
      chainId,
      blockchain,
      network,
      rpcUrl,
      stateContractAddress,
      networkFlag,
    });
  };

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
    flex: 1, // This makes the container take up the full height
    backgroundColor: "#ffffff", // Ensure the background is white for the entire screen
    padding: 16,
    justifyContent: "center", // Centers the content vertically
    alignItems: "center", // Centers the content horizontally
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6200EE",
    marginBottom: 20,
    marginTop:-200,
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
