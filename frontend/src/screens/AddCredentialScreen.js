import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { networkService } from '../services/networkService';

const AddCredentialScreen = ({ navigation }) => {
  const [issuerAddress, setIssuerAddress] = useState("");
  const [network, setNetwork] = useState("");
  const [isNetworkModalVisible, setNetworkModalVisible] = useState(false);
  const [availableNetworks, setAvailableNetworks] = useState([]);

  useEffect(() => {
    // Fetch available networks when the screen loads
    const fetchData = async () => {
      try {
        const networks = await networkService.getNetworks();
        setAvailableNetworks(networks);
      } catch (error) {
        console.error('Failed to fetch networks:', error);
      }
    };
    fetchData();
  }, []);

  const handleAddCredential = () => {
    console.log("Issuer Address:", issuerAddress);
    console.log("Selected Network:", network);
    navigation.goBack();
  };

  const openNetworkModal = () => {
    setNetworkModalVisible(true);
  };

  const closeNetworkModal = () => {
    setNetworkModalVisible(false);
  };

  const handleSelectNetwork = (selectedNetwork) => {
    setNetwork(selectedNetwork);
    closeNetworkModal();
  };

  const handleDeleteNetwork = async (networkToDelete) => {
    try {
      // Assuming the 'id' of the network is stored in '_id' on the backend
      const networkId = networkToDelete._id;  // Use '_id' to match the backend
      // Remove the network from the database
      await networkService.deleteNetwork(networkId);
      // Remove the network from the state
      setAvailableNetworks(availableNetworks.filter((network) => network._id !== networkId));
    } catch (error) {
      console.error("Failed to delete network:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Fetch on-chain credentials from a contract address.
      </Text>

      {/* Enter Address */}
      <TextInput
        style={styles.input}
        placeholder="Enter address"
        value={issuerAddress}
        onChangeText={setIssuerAddress}
        placeholderTextColor="#aaa"
      />

      {/* Network Heading */}
      <Text style={styles.sectionHeader}>Network</Text>

      {/* Select Network */}
      <TouchableOpacity style={styles.networkContainer} onPress={openNetworkModal}>
        <Text style={styles.networkValue}>
          {network || "Select a network"}
        </Text>
      </TouchableOpacity>

      {/* Add Credentials Button */}
      <TouchableOpacity style={styles.button} onPress={handleAddCredential}>
        <Text style={styles.buttonText}>Add Credentials</Text>
      </TouchableOpacity>

      {/* Network Modal */}
      <Modal visible={isNetworkModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Select a Network</Text>
            <FlatList
              data={availableNetworks}
              keyExtractor={(item) => item.chainId} // Use chainId as key
              renderItem={({ item }) => (
                <View style={styles.networkItemContainer}>
                  <TouchableOpacity
                    style={styles.networkItem}
                    onPress={() => handleSelectNetwork(item.network)}
                  >
                    <Text style={styles.networkItemText}>{item.network}</Text>
                  </TouchableOpacity>

                  {/* Trash icon for deleting network */}
                  <TouchableOpacity
                    style={styles.deleteIconContainer}
                    onPress={() => handleDeleteNetwork(item)}
                  >
                    <Icon name="delete" size={24} color="#FF6347" />
                  </TouchableOpacity>
                </View>
              )}
            />

            <TouchableOpacity
              style={styles.addNetworkButton}
              onPress={() => {
                closeNetworkModal();
                navigation.navigate("AddCustomNetworkScreen");
              }}
            >
              <Text style={styles.addNetworkText}>+ Add Network</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  networkContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
  networkValue: {
    fontSize: 14,
    color: "#555",
  },
  button: {
    backgroundColor: "#6200EE",
    padding: 14,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "80%",
    padding: 20,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  networkItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  networkItem: {
    flex: 1,
  },
  networkItemText: {
    fontSize: 14,
  },
  deleteIconContainer: {
    paddingLeft: 10,
  },
  addNetworkButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#28a745",
    borderRadius: 4,
    alignItems: "center",
  },
  addNetworkText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default AddCredentialScreen;
