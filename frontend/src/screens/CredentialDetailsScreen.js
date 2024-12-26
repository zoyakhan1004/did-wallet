// // src/screens/CredentialDetailsScreen.js
// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// const CredentialDetailsScreen = ({ route, navigation }) => {
//   const { credential } = route.params; // Credential data passed from previous screen

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Credential Details</Text>
      
//       <View style={styles.detailsContainer}>
//         <Text style={styles.label}>Type:</Text>
//         <Text style={styles.value}>{credential.type}</Text>

//         <Text style={styles.label}>Details:</Text>
//         <Text style={styles.value}>{JSON.stringify(credential.details, null, 2)}</Text>

//         <Text style={styles.label}>Status:</Text>
//         <Text style={styles.value}>{credential.status}</Text>
//       </View>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.navigate("ProofScreen", { credential })}
//       >
//         <Text style={styles.buttonText}>Generate Proof</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#ffffff",
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#6200EE",
//     marginBottom: 20,
//   },
//   detailsContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333333",
//     marginTop: 10,
//   },
//   value: {
//     fontSize: 14,
//     color: "#555555",
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: "#6200EE",
//     paddingVertical: 15,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
// });

// export default CredentialDetailsScreen;
