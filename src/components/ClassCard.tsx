import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ClassItem } from "../data/classes";

export default function ClassCard({ item, credits, booking, onBook }: {
  item: ClassItem;
  credits: number;
  booking: boolean;
  onBook: () => void;
}) {
  const isDisabled = Boolean(item.booked || booking || credits <= 0);
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.meta}>{item.level} • {item.instructor}</Text>
        <Text style={styles.center}>{item.center}</Text>
      </View>

      <TouchableOpacity
        onPress={onBook}
        disabled={isDisabled}
        style={[styles.btn, isDisabled && styles.disabled]}
      >
        <Text style={styles.btnText}>{booking ? "Booking..." : item.booked ? "Booked" : "Quick Book"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", padding: 12, backgroundColor: "#fafafa", borderRadius: 12, marginBottom: 12 },
  title: { fontSize: 16, fontWeight: "700" },
  meta: { color: "#666", marginTop: 4 },
  center: { color: "#444", marginTop: 6 },
  btn: { backgroundColor: "#0a84ff", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, justifyContent: "center" },
  disabled: { backgroundColor: "#cfdcff" },
  btnText: { color: "white", fontWeight: "700" },
});