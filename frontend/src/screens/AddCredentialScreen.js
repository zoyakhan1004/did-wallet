import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { networkService } from '../services/networkService.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCredentialScreen = ({ navigation }) => {
  const [blockchain, setBlockchain] = useState('');
  const [did, setDid] = useState('');
  const [issuerAddress, setIssuerAddress] = useState("");
  const [network, setNetwork] = useState("");
  const [isNetworkModalVisible, setNetworkModalVisible] = useState(false);
  const [availableNetworks, setAvailableNetworks] = useState([]);

  useEffect(() => {
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

  const handleDeleteNetwork = async (networkToDelete) => {
    if (!networkToDelete || !networkToDelete.chainId) {
      console.error('Invalid network to delete:', networkToDelete);
      Alert.alert('Error', 'Invalid network selected for deletion.');
      return;
    }

    console.log('Attempting to delete network:', networkToDelete);

    try {
      const response = await networkService.deleteNetwork(networkToDelete.chainId);
      console.log('Delete response:', response);

      const updatedNetworks = availableNetworks.filter(
        (network) => network.chainId !== networkToDelete.chainId
      );
      setAvailableNetworks(updatedNetworks);

      console.log(`Network ${networkToDelete.network} deleted successfully.`);
    } catch (error) {
      console.error('Failed to delete network:', error);
      Alert.alert('Error', 'Error deleting the network. Please try again.');
    }
  };

  const openNetworkModal = () => {
    setNetworkModalVisible(true);
  };

  const closeNetworkModal = () => {
    setNetworkModalVisible(false);
  };

  const handleSelectNetwork = async (selectedNetwork) => {
    setNetwork(selectedNetwork);
    console.log('selectedNetwork:', selectedNetwork);
    closeNetworkModal();
  
    try {
      const networkData = availableNetworks.find((net) => net.network === selectedNetwork);
      console.log('networkData:', networkData);
      if (!networkData) {
        throw new Error('No network data found');
      }
  
      const associatedBlockchain = networkData.blockchain;
      if (!associatedBlockchain) {
        throw new Error('Blockchain is undefined for the selected network');
      }
  
      console.log('associatedBlockchain:', associatedBlockchain);
  
      // Call the backend to generate the DID
      const { did, didDocument, keyPair } = await handleGenerateDID(associatedBlockchain, selectedNetwork);
  
      // Store the generated DID, key pair, and DID document in AsyncStorage
      if (did && keyPair) {
        try {
          await AsyncStorage.setItem('walletDID', did);
          await AsyncStorage.setItem('keyPair', JSON.stringify(keyPair));
          await AsyncStorage.setItem('didDocument', JSON.stringify(didDocument));
          console.log('DID, key pair, and DID document stored successfully');
        } catch (storageError) {
          console.error('Error saving DID or key pair:', storageError);
        }
      }
  
      return { did, didDocument, keyPair };  // Return the DID if needed
  
    } catch (error) {
      console.error('Error fetching blockchain for network:', error);
      Alert.alert(
        'Network Selection Error',
        'Unable to process the selected network. Please try again.'
      );
    }
  };
  
  const handleGenerateDID = async (blockchain, network) => {
    try {
      const response = await fetch(`https://8e61-110-227-204-245.ngrok-free.app/api/network/generate-did`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blockchain, network }),
      });
  
      const data = await response.json();
      if (data.success) {
        await AsyncStorage.setItem('walletDID', data.did);
        await AsyncStorage.setItem('keyPair', JSON.stringify(data.keyPair));
        await AsyncStorage.setItem('didDocument', JSON.stringify(data.didDocument));
        return data;
      } else {
        throw new Error(data.message || 'Failed to generate DID');
      }
    } catch (error) {
      console.error('Error generating DID:', error);
      Alert.alert('DID Generation Error', 'Unable to generate DID. Please try again.');
    }
  };     
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Fetch on-chain credentials from a contract address.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter address"
        value={issuerAddress}
        onChangeText={setIssuerAddress}
        placeholderTextColor="#aaa"
      />

      <Text style={styles.sectionHeader}>Network</Text>

      <TouchableOpacity style={styles.networkContainer} onPress={openNetworkModal}>
        <Text style={styles.networkValue}>
          {network || "Select a network"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleAddCredential}>
        <Text style={styles.buttonText}>Add Credentials</Text>
      </TouchableOpacity>

      <Modal visible={isNetworkModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Select a Network</Text>
            <FlatList
              data={availableNetworks}
              keyExtractor={(item) => item.chainId}
              renderItem={({ item }) => (
                <View style={styles.networkItemContainer}>
                  <TouchableOpacity
                    style={styles.networkItem}
                    onPress={() => handleSelectNetwork(item.network)}
                  >
                    <Text style={styles.networkItemText}>{item.network}</Text>
                  </TouchableOpacity>

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
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  networkContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 12,
    borderRadius: 4,
  },
  networkValue: {
    fontSize: 14,
    color: "#888",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 4,
    width: "80%",
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  networkItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  networkItem: {
    flex: 1,
  },
  networkItemText: {
    fontSize: 16,
  },
  deleteIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  addNetworkButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginTop: 12,
  },
  addNetworkText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default AddCredentialScreen;