import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, ActivityIndicator, Modal } from "react-native";
import { ClassItem, Level, MOCK_CLASSES } from "../data/classes";
import ClassCard from "../components/ClassCard";
import { useToast } from "../hooks/useToast";
import { Toast } from "../components/Toast";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [credits, setCredits] = useState(8);
  const [bookingMap, setBookingMap] = useState<Record<string, boolean>>({});

  const [levelFilter, setLevelFilter] = useState<Level | "All">("All");
  const [instrFilter, setInstrFilter] = useState<string | "All">("All");
  const [instrModal, setInstrModal] = useState(false);

  const { toast, setToast, translateY } = useToast();

  useEffect(() => {
    setTimeout(() => {
      setClasses(MOCK_CLASSES);
      setLoading(false);
    }, 1500);
  }, []);

  const instructors = useMemo(() => Array.from(new Set(MOCK_CLASSES.map(c => c.instructor))), []);

  const filtered = useMemo(() => {
    return classes.filter(c => {
      if (levelFilter !== "All" && c.level !== levelFilter) return false;
      if (instrFilter !== "All" && c.instructor !== instrFilter) return false;
      return true;
    });
  }, [classes, levelFilter, instrFilter]);

  function optimisticBook(id: string) {
    if (bookingMap[id]) return;

    const prev = classes.map(c => ({ ...c }));
    setClasses(prev => prev.map(c => (c.id === id ? { ...c, booked: true } : c)));
    setBookingMap(m => ({ ...m, [id]: true }));
    setCredits(c => c - 1);
    setToast("Booking...");

    setTimeout(() => {
      const failed = Math.random() < 0.15;
      if (failed) {
        setClasses(prev);
        setCredits(c => c + 1);
        setToast("Booking failed. Try again.");
      } else {
        setToast("Booked successfully!");
      }
      setBookingMap(m => { const x = { ...m }; delete x[id]; return x; });
    }, 1000);
  }

  if (loading) return (
    <SafeAreaView style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
      <ActivityIndicator size={45} />
      <Text style={{ marginTop: 10 }}>Loading classes...</Text>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Top Navigation Button */}
        <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={{ alignSelf: "flex-end", marginBottom: 12 }}>
          <Text style={{ color: "#0a84ff", fontWeight: "700" }}>Go to Profile →</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 18, fontWeight: "700" }}>Filters</Text>

        {/* Level Chips */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 8 }}>
          {(["All", "Beginner", "Intermediate", "Advanced"] as const).map(lv => (
            <TouchableOpacity key={lv} onPress={() => setLevelFilter(lv)} style={{
              padding: 10,
              paddingHorizontal: 14,
              backgroundColor: levelFilter === lv ? "#0a84ff" : "#eee",
              borderRadius: 20,
              marginRight: 8,
              marginBottom: 8,
            }}>
              <Text style={{ color: levelFilter === lv ? "white" : "black" }}>{lv}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Instructor Filter */}
        <TouchableOpacity onPress={() => setInstrModal(true)} style={{ borderWidth: 1, borderColor: "#ddd", padding: 12, borderRadius: 8, marginTop: 12 }}>
          <Text>{instrFilter === "All" ? "All instructors" : instrFilter}</Text>
        </TouchableOpacity>

        {/* Empty State */}
        {filtered.length === 0 && (
          <View style={{ alignItems: "center", marginTop: 24 }}>
            <Text style={{ fontSize: 16, marginBottom: 12 }}>
              No classes match your filters.
            </Text>
            <TouchableOpacity
              onPress={() => { 
                setLevelFilter("All"); 
                setInstrFilter("All"); 
              }}
              style={{
                backgroundColor: "#0a84ff",
                paddingHorizontal: 18,
                paddingVertical: 10,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>Clear Filters</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Class List */}
        <View style={{ marginTop: 16 }}>
          {filtered.map(item => (
            <ClassCard
              key={item.id}
              item={item}
              credits={credits}
              booking={Boolean(bookingMap[item.id])}
              onBook={() => optimisticBook(item.id)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Instructor Modal */}
      <Modal visible={instrModal === true} transparent={true} animationType="fade">
        <View style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.4)",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <View style={{
            backgroundColor: "white",
            padding: 16,
            width: "80%",
            borderRadius: 12
          }}>
            <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
              Select Instructor
            </Text>

            <ScrollView style={{ maxHeight: 200 }}>
              <TouchableOpacity
                onPress={() => { setInstrFilter("All"); setInstrModal(false); }}
                style={{ padding: 12, borderBottomWidth: 1, borderColor: "#eee" }}
              >
                <Text>All Instructors</Text>
              </TouchableOpacity>

              {instructors.map(inst => (
                <TouchableOpacity
                  key={inst}
                  onPress={() => { setInstrFilter(inst); setInstrModal(false); }}
                  style={{ padding: 12, borderBottomWidth: 1, borderColor: "#eee" }}
                >
                  <Text>{inst}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => setInstrModal(false)}
              style={{
                marginTop: 12,
                padding: 12,
                borderRadius: 8,
                backgroundColor: "#ddd",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "600" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Toast Notification */}
      {toast && <Toast text={toast} translateY={translateY} />}
    </SafeAreaView>
  );
}
