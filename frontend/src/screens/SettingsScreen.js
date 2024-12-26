import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert, ScrollView, Clipboard } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation, route }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Check if the DID from params is a valid string or fallback to default
  const [did, setDid] = useState("did:iden3:blockchain:network:unique-identifier");

  // Fetch DID from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchDID = async () => {
      try {
        const storedDid = await AsyncStorage.getItem('walletDID');
        console.log("🚀 ~ fetchDID ~ storedDid:", storedDid);
  
        if (storedDid) {
          setDid(storedDid); // Directly set the plain string into state
        } else {
          console.log('No DID found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Error retrieving DID:', error);
      }
    };
  
    fetchDID();
  }, []);  

  const handleToggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  const handleCopyDid = () => {
    Clipboard.setString(did);
    Alert.alert("Copied to Clipboard", "Wallet's DID has been copied.");
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Welcome" }], // Adjust route name as needed
            });
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Identity Section */}
      <Text style={styles.sectionHeader}>Identity</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Wallet's DID</Text>
        <View style={styles.didContainer}>
          {/* Ensure DID is rendered as a string */}
          <Text style={styles.didText} numberOfLines={1}>{did}</Text>
          <TouchableOpacity onPress={handleCopyDid}>
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Account Section */}
      <Text style={styles.sectionHeader}>Account</Text>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => Alert.alert("Recovery Phrase", "View or reset your recovery phrase.")}
      >
        <Text style={styles.settingText}>Recovery Phrase</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => Alert.alert("Change Password", "Change your account password.")}
      >
        <Text style={styles.settingText}>Change Password</Text>
      </TouchableOpacity>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Face ID</Text>
        <Switch value={notificationsEnabled} onValueChange={handleToggleNotifications} />
      </View>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => Alert.alert("Ask for Passcode", "Enable passcode to sign in.")}
      >
        <Text style={styles.settingText}>Ask for Passcode to Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => Alert.alert("Connections", "Manage your connections.")}
      >
        <Text style={styles.settingText}>Connections</Text>
      </TouchableOpacity>

      {/* Credential Vault Section */}
      <Text style={styles.sectionHeader}>Credential Vault</Text>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => Alert.alert("Sync Now", "Sync your credentials.")}
      >
        <Text style={styles.settingText}>Sync Now</Text>
      </TouchableOpacity>

      {/* Credentials Section */}
      <Text style={styles.sectionHeader}>Credentials</Text>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => Alert.alert("Remove All Credentials", "Remove all stored credentials.")}
      >
        <Text style={styles.settingText}>Remove All Credentials</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => Alert.alert("Remove Identity", "Remove your identity from the system.")}
      >
        <Text style={styles.settingText}>Remove Identity</Text>
      </TouchableOpacity>

      {/* Logout Option */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6200EE",
    marginBottom: 30,
    textAlign: "center",
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6200EE",
    marginBottom: 10,
    marginTop: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  settingText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
  },
  didContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  didText: {
    fontSize: 16,
    color: "#333",
    marginRight: 10,
    flex: 1,
    overflow: "hidden",
  },
  copyText: {
    fontSize: 16,
    color: "#6200EE",
  },
  logoutButton: {
    padding: 16,
    backgroundColor: "#f44336",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 40,
  },
  logoutButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SettingsScreen;