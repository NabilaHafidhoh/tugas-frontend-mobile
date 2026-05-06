import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import api from "../api/api";

export default function PesertaFormScreen({ route, navigation }) {
  const id = route.params?.id;

  const [form, setForm] = useState({
    nama: "",
    kota: "", // Disesuaikan dari tempatlahir
    provinsi: "", // Tambahan sesuai DB
    alamat: "",
    no_telp: "", // Disesuaikan dari telepon
    jk: "",
  });

  useEffect(() => {
    if (id) {
      getPesertaById();
    }
  }, [id]);

  const getPesertaById = async () => {
    try {
      const response = await api.get(`/peserta/${id}`);
      const data = Array.isArray(response.data) ? response.data[0] : response.data;
      
      setForm({
        nama: data.nama || "",
        kota: data.kota || "",
        provinsi: data.provinsi || "",
        alamat: data.alamat || "",
        no_telp: data.no_telp || "",
        jk: data.jk || "",
      });
    } catch (error) {
      Alert.alert("Error", "Gagal mengambil detail peserta");
    }
  };

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const simpanPeserta = async () => {
    if (!form.nama || !form.kota) {
      Alert.alert("Validasi", "Nama dan Kota wajib diisi");
      return;
    }

    try {
      if (id) {
        await api.put(`/peserta/${id}`, form);
        Alert.alert("Sukses", "Data berhasil diperbarui");
      } else {
        await api.post("/peserta", form);
        Alert.alert("Sukses", "Data berhasil ditambahkan");
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Gagal menyimpan data");
      console.log(error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nama Lengkap</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Nama"
        value={form.nama}
        onChangeText={(value) => handleChange("nama", value)}
      />

      <Text style={styles.label}>Kota</Text>
      <TextInput
        style={styles.input}
        placeholder="Contoh: Surabaya"
        value={form.kota}
        onChangeText={(value) => handleChange("kota", value)}
      />

      <Text style={styles.label}>Provinsi</Text>
      <TextInput
        style={styles.input}
        placeholder="Contoh: Jawa Timur"
        value={form.provinsi}
        onChangeText={(value) => handleChange("provinsi", value)}
      />

      <Text style={styles.label}>Alamat</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Masukkan Alamat Lengkap"
        value={form.alamat}
        onChangeText={(value) => handleChange("alamat", value)}
        multiline
      />

      <Text style={styles.label}>Telepon</Text>
      <TextInput
        style={styles.input}
        placeholder="Contoh: 0812345678"
        value={form.no_telp}
        onChangeText={(value) => handleChange("no_telp", value)}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Jenis Kelamin (L/P)</Text>
      <TextInput
        style={styles.input}
        placeholder="L atau P"
        value={form.jk}
        onChangeText={(value) => handleChange("jk", value)}
        maxLength={1}
      />

      <TouchableOpacity style={styles.saveButton} onPress={simpanPeserta}>
        <Text style={styles.saveButtonText}>
          {id ? "UPDATE DATA" : "SIMPAN DATA"}
        </Text>
      </TouchableOpacity>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, 
    padding: 16, 
    backgroundColor: "#fff" 
  },
  label: { fontWeight: "bold", 
    marginBottom: 5, 
    color: "#374151" 
  },
  input: { backgroundColor: "#f9fafb", 
    borderWidth: 1, 
    borderColor: "#d1d5db", 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 15 
  },
  saveButton: { backgroundColor: "#16a34a", 
    padding: 16, 
    borderRadius: 8, 
    marginTop: 10 
  },
  saveButtonText: { color: "#fff", 
    textAlign: "center", 
    fontWeight: "bold", 
    fontSize: 16 
  },
});