import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const APIStatus = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch('');
        const data = await res.json();
        setStatus(data.status); // should be 1 or 0
      } catch (error) {
        console.error('Error fetching API status:', error);
        setStatus(0); // fallback to offline
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#11369a" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 12, color: "white" }}>
        {status === 1 ? '❌ App Crashed, Please uninstall' : ''}
      </Text>
    </View>
  );
};

export default APIStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
