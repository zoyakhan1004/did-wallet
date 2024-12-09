// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import QRScanner from '../components/QRScanner'; // Import the updated QRScanner component

// const ScanScreen = ({ navigation }) => {
//   const [scannedData, setScannedData] = useState(null);
//   const [isScanning, setIsScanning] = useState(true); // To control when scanning is allowed

//   const handleCodeScanned = ({ type, data }) => {
//     console.log(`Scanned type: ${type}, data: ${data}`);
//     setScannedData(data); // Store the scanned data
//     alert(`Scanned QR Code Data: ${data}`); // Show an alert with the scanned data
//     setIsScanning(false); // Stop scanning after a successful scan
//     // Optionally, navigate or store the scanned data
//     // navigation.navigate('CredentialDetails', { qrData: data });
//   };

//   const handleScanAgain = () => {
//     setIsScanning(true); // Reset scanning
//     setScannedData(null); // Clear previous scanned data
//   };

//   return (
//     <View style={styles.container}>
//       {isScanning ? (
//         <QRScanner onCodeScanned={handleCodeScanned} />
//       ) : (
//         <View style={styles.resultContainer}>
//           <Text style={styles.text}>Scanned Data: {scannedData}</Text>
//           <Button title="Scan Again" onPress={handleScanAgain} />
//           {/* Optional: Navigate to a different screen */}
//           {/* navigation.navigate('CredentialDetails', { qrData: scannedData }); */}
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   resultContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     padding: 20,
//     fontSize: 16,
//     color: '#000',
//     textAlign: 'center',
//   },
// });

// export default ScanScreen;
