import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { credentialService } from "../services/credentialService"; // Assuming the service is in the services folder

const CredentialsScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState("Active");
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch credentials on component mount
  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const data = await credentialService.getAllCredentials();
        // Ensure data is an array
        if (Array.isArray(data)) {
          setCredentials(data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        setError("Failed to fetch credentials");
        Alert.alert("Error", "Failed to load credentials");
      } finally {
        setLoading(false);
      }
    };

    fetchCredentials();
  }, []);

  // Filter credentials based on selected tab
  const filteredData = credentials.filter((item) => item.status === selectedTab);

  return (
    <View style={styles.container}>
      {/* Header with Add (+) Button */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Your Credentials</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddCredential")}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === "Active" && styles.activeTab,
          ]}
          onPress={() => setSelectedTab("Active")}
        >
          <Text style={[styles.tabText, selectedTab === "Active" && styles.activeTabText]}>
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === "Expired" && styles.activeTab,
          ]}
          onPress={() => setSelectedTab("Expired")}
        >
          <Text style={[styles.tabText, selectedTab === "Expired" && styles.activeTabText]}>
            Expired
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === "Revoked" && styles.activeTab,
          ]}
          onPress={() => setSelectedTab("Revoked")}
        >
          <Text style={[styles.tabText, selectedTab === "Revoked" && styles.activeTabText]}>
            Revoked
          </Text>
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#6200EE" />
      ) : (
        <>
          {/* Credential List */}
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>{item.type}</Text>
                  <Text style={styles.cardDetails}>{item.details}</Text>
                </View>
              )}
              contentContainerStyle={styles.listContainer}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#6200EE",
  },
  addButton: {
    backgroundColor: "#6200EE",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginBottom: 20,
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: "#6200EE",
    borderRadius: 10,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  activeTabText: {
    color: "#fff",
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#e3f2fd",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a73e8",
    marginBottom: 8,
  },
  cardDetails: {
    fontSize: 14,
    color: "#555",
  },
  errorText: {
    textAlign: "center",
    color: "red",
    fontSize: 16,
  },
});

export default CredentialsScreen;
