import { useMemo, useState, useEffect } from "react";
import { Animated } from "react-native";

export function useToast() {
  const [toast, setToast] = useState<string | null>(null);
  const translateY = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    if (!toast) return;
    Animated.timing(translateY, { toValue: 1, duration: 250, useNativeDriver: true }).start(() => {
      setTimeout(() => {
        Animated.timing(translateY, { toValue: 0, duration: 250, useNativeDriver: true }).start(() => setToast(null));
      }, 2000);
    });
  }, [toast]);

  return { toast, setToast, translateY };
}