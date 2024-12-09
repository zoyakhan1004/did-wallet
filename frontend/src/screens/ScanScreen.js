// import React, { useState } from "react";
// import { View, Text, StyleSheet, Alert } from "react-native";
// import { RNCamera } from "react-native-camera";
// import QRCodeScanner from "react-native-qrcode-scanner";

// const ScanScreen = ({ navigation }) => {
//   const [scannedData, setScannedData] = useState(null);

//   const onScanSuccess = (e) => {
//     setScannedData(e.data);
//     Alert.alert("QR Code Scanned", `Scanned Data: ${e.data}`);
//   };

//   return (
//     <View style={styles.container}>
//       <QRCodeScanner
//         onRead={onScanSuccess}
//         topContent={<Text style={styles.heading}>Scan QR Code</Text>}
//         bottomContent={
//           <Text style={styles.text}>Please scan a QR code to proceed.</Text>
//         }
//         cameraStyle={styles.camera}
//       />
//       {scannedData && (
//         <View style={styles.resultContainer}>
//           <Text style={styles.scannedDataText}>Scanned Data: {scannedData}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   camera: {
//     width: "100%",
//     height: "100%",
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#6200EE",
//     textAlign: "center",
//   },
//   text: {
//     fontSize: 16,
//     color: "#333",
//     textAlign: "center",
//   },
//   resultContainer: {
//     marginTop: 20,
//     padding: 16,
//     backgroundColor: "#f0f0f0",
//     borderRadius: 8,
//     borderColor: "#6200EE",
//     borderWidth: 1,
//   },
//   scannedDataText: {
//     fontSize: 16,
//     color: "#6200EE",
//   },
// });

// export default ScanScreen;
