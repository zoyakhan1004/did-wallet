import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const credentialsData = [
  { id: "1", type: "Passport", details: "Passport Number: AB12345" },
  { id: "2", type: "PAN Card", details: "PAN: ABCDE1234F" },
];

const CredentialsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Credentials</Text>
      <FlatList
        data={credentialsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.type}</Text>
            <Text style={styles.cardDetails}>{item.details}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
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
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#6200EE",
    textAlign: "left",
    marginBottom: 20,
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
});

export default CredentialsScreen;
