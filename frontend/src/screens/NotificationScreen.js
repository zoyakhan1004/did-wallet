import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";

// Sample notifications
const notificationsData = [
  { id: "1", message: "New connection request", read: false },
  { id: "2", message: "New credential", read: true },
];

const NotificationScreen = () => {
  const [filter, setFilter] = useState("all"); // 'all', 'read', or 'unread'
  const [notifications, setNotifications] = useState(notificationsData);

  // Filter notifications based on the selected filter
  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true;
    if (filter === "read") return notification.read;
    if (filter === "unread") return !notification.read;
  });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <View style={styles.container}>
      {/* Removed the header section */}

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => handleFilterChange("all")} style={styles.filterButton}>
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterChange("unread")} style={styles.filterButton}>
          <Text style={styles.filterText}>Unread</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilterChange("read")} style={styles.filterButton}>
          <Text style={styles.filterText}>Read</Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationCard}>
            <Text style={styles.notificationMessage}>{item.message}</Text>
            <Text style={styles.notificationStatus}>
              {item.read ? "Read" : "Unread"}
            </Text>
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
    padding: 16,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    backgroundColor: "#6200EE",
    borderRadius: 8,
  },
  filterText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  listContainer: {
    paddingBottom: 20,
  },
  notificationCard: {
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
  notificationMessage: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  notificationStatus: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
});

export default NotificationScreen;
