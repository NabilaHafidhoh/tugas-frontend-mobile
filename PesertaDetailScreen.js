import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import api from '../api/api';

export default function PesertaDetailScreen({ route }) {
  const { id } = route.params;
  const [peserta, setPeserta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/peserta/${id}`)
      .then(res => {
        setPeserta(Array.isArray(res.data) ? res.data[0] : res.data);
        setLoading(false);
      })
      .catch(() => {
        Alert.alert("Error", "Gagal memuat detail");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Nama:</Text>
        <Text style={styles.value}>{peserta?.nama}</Text>
        
        <Text style={styles.label}>TTL:</Text>
        <Text style={styles.value}>{peserta?.tempatlahir}, {peserta?.tanggallahir}</Text>
        
        <Text style={styles.label}>Jenis Kelamin:</Text>
        <Text style={styles.value}>{peserta?.jk === 'L' ? 'Laki-laki' : 'Perempuan'}</Text>
        
        <Text style={styles.label}>Telepon:</Text>
        <Text style={styles.value}>{peserta?.telepon}</Text>
        
        <Text style={styles.label}>Alamat:</Text>
        <Text style={styles.value}>{peserta?.alamat}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, 
    backgroundColor: '#f3f4f6' 
  },
  card: { backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 12, 
    elevation: 3 
  },
  label: { fontSize: 12, 
    color: '#9ca3af', 
    fontWeight: 'bold', 
    marginTop: 10 
  },
  value: { fontSize: 18, 
    color: '#1f2937', 
    borderBottomWidth: 1, 
    borderBottomColor: '#f3f4f6', 
    paddingBottom: 5 
  }
});