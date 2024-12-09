import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert, Modal, Button } from "react-native";

const SettingsScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState("English");
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const handleToggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  const handleChangeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    setLanguageModalVisible(false);
    Alert.alert("Language Changed", `Language has been set to ${newLanguage}`);
  };

  const handleLogout = () => {
    // Clear session data or token if needed
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "OK", 
          onPress: () => {
            // Reset the navigation stack and go to the Welcome screen
            navigation.reset({
              index: 0,
              routes: [{ name: 'Welcome' }], // Ensure this matches your screen name
            });
          }
        },
      ]
    );
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Personal Information */}
      <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert("Personal Information", "Update your personal information.")}>
        <Text style={styles.settingText}>Personal Information</Text>
      </TouchableOpacity>

      {/* Security */}
      <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert("Security", "Update your security settings.")}>
        <Text style={styles.settingText}>Security</Text>
      </TouchableOpacity>

      {/* Notifications */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Notifications</Text>
        <Switch value={notificationsEnabled} onValueChange={handleToggleNotifications} />
      </View>

      {/* Language */}
      <TouchableOpacity style={styles.settingItem} onPress={() => setLanguageModalVisible(true)}>
        <Text style={styles.settingText}>Language: {language}</Text>
      </TouchableOpacity>

      {/* Language Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={languageModalVisible}
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.languageModal}>
            <Text style={styles.languageModalHeader}>Select Language</Text>
            <TouchableOpacity style={styles.languageOption} onPress={() => handleChangeLanguage("English")}>
              <Text style={styles.languageOptionText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.languageOption} onPress={() => handleChangeLanguage("Spanish")}>
              <Text style={styles.languageOptionText}>Spanish</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.languageOption} onPress={() => handleChangeLanguage("French")}>
              <Text style={styles.languageOptionText}>French</Text>
            </TouchableOpacity>
            <Button title="Cancel" onPress={() => setLanguageModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Logout Option */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6200EE",
    marginBottom: 30,
    textAlign: "center",
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
  languageModal: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    width: "80%",
    marginTop: "30%",
  },
  languageModalHeader: {
    fontSize: 22,
    color: "#6200EE",
    marginBottom: 20,
    fontWeight: "bold",
  },
  languageOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  languageOptionText: {
    fontSize: 18,
    color: "#6200EE",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  logoutButton: {
    marginTop: 30,
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
