import React from "react";
import { Animated, Text, StyleSheet } from "react-native";

export function Toast({ text, translateY }: { text: string; translateY: any }) {
  return (
    <Animated.View style={[styles.toast, { transform: [{ translateY }] }]}>
      <Text style={{ color: "white", fontWeight: "600" }}>{text}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: { position: "absolute", bottom: 24, left: 24, right: 24, backgroundColor: "#111", padding: 12, borderRadius: 8, alignItems: "center" },
});