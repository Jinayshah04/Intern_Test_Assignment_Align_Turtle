export type Level = "Beginner" | "Intermediate" | "Advanced";

export type ClassItem = {
  id: string;
  name: string;
  level: Level;
  instructor: string;
  center: string;
  booked?: boolean;
};

export const MOCK_CLASSES: ClassItem[] = [
  { id: "c1", name: "Yoga Flow", level: "Beginner", instructor: "Asha Patel", center: "Downtown Studio" },
  { id: "c2", name: "HIIT Blast", level: "Intermediate", instructor: "Ravi Singh", center: "East Center" },
  { id: "c3", name: "Pilates Core", level: "Beginner", instructor: "Meera Rao", center: "West Hub" },
  { id: "c4", name: "Advanced Boxing", level: "Advanced", instructor: "Ravi Singh", center: "East Center" },
  { id: "c5", name: "Flow & Chill", level: "Intermediate", instructor: "Asha Patel", center: "Downtown Studio" },
  { id: "c6", name: "Spin Sprint", level: "Advanced", instructor: "Karthik", center: "North Gym" },
];