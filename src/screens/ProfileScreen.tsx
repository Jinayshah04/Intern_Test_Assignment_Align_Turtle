import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from "react-native";

export default function ProfileScreen() {
  const [name, setName] = useState("Jinay Shah");
  const [tempName, setTempName] = useState(name);
  const [modalVisible, setModalVisible] = useState(false);

  const saveName = () => {
    setName(tempName);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Full Name</Text>
        <Text style={styles.value}>{name}</Text>

        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Edit Name</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal visible={modalVisible === true} transparent={true}  animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Name</Text>

            <TextInput
              style={styles.input}
              value={tempName}
              onChangeText={setTempName}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveBtn} onPress={saveName}>
                <Text style={styles.btnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  value: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 5,
  },
  button: {
    marginTop: 15,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  saveBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  btnText: {
    fontSize: 16,
    color: "#fff",
  },
});
