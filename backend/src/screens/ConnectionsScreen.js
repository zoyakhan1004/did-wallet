import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const connectionsData = [
  { id: "1", name: "John Doe", type: "Verifier" },
  { id: "2", name: "Jane Smith", type: "Issuer" },
];

const ConnectionsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Connections</Text>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => navigation.navigate("NotificationScreen")}>
            <FontAwesome name="bell" size={24} color="#6200EE" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("AddCustomNetworkScreen")}>
            <FontAwesome name="plus-circle" size={24} color="#6200EE" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={connectionsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.type}</Text>
          </TouchableOpacity>
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#6200EE",
  },
  icons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#f0f4ff",
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
    color: "#333",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
});

export default ConnectionsScreen;
