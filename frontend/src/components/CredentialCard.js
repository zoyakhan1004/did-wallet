import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CredentialCard = ({ title, issuer, issuedDate }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.issuer}>Issuer: {issuer}</Text>
      <Text style={styles.date}>Issued: {issuedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  issuer: { fontSize: 14, marginTop: 5 },
  date: { fontSize: 12, marginTop: 5, color: '#777' },
});

export default CredentialCard;
