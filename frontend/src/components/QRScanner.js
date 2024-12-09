// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { Camera } from 'expo-camera'; // Using expo-camera instead of expo-barcode-scanner

// const QRScanner = ({ onCodeScanned }) => {
//   const [hasPermission, setHasPermission] = useState(null); // State to store camera permission status
//   const [scanned, setScanned] = useState(false); // State to track if a code has been scanned

//   // Requesting camera permissions
//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   // If permission is null or denied, show a message
//   if (hasPermission === null) {
//     return <Text>Requesting camera permission...</Text>;
//   }

//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   // Handle QR code scan
//   const handleBarCodeScanned = ({ type, data }) => {
//     setScanned(true); // Mark that a code has been scanned
//     onCodeScanned({ type, data }); // Pass scanned data back to the parent component
//   };

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={StyleSheet.absoluteFillObject}
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//       >
//         <View style={styles.overlay}>
//           <Text style={styles.text}>Scan QR Code</Text>
//         </View>
//       </Camera>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   overlay: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: [{ translateX: -75 }, { translateY: -20 }],
//   },
//   text: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default QRScanner;
