import { Visitor } from "@prisma/client";

export function sortClicksByDay(data: Visitor[]) {
  // Tworzenie tablicy dni tygodnia
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Inicjalizacja tablicy wynikowej
  const result: { day: string; clicks: number }[] = [];

  // Inicjalizacja obiektu, który będzie przechowywał dane posortowane wg dnia tygodnia
  const sortedData: any = {};

  // Iteracja przez dane i sortowanie ich wg dnia tygodnia
  data.forEach((item) => {
    // Pobranie dnia tygodnia na podstawie createdAt
    const createdAt = new Date(item.createdAt);
    const dayOfWeek = daysOfWeek[createdAt.getDay()];

    // Dodanie obiektu do odpowiedniego dnia
    if (!sortedData[dayOfWeek]) {
      sortedData[dayOfWeek] = 0;
    }
    sortedData[dayOfWeek] += 1;
  });

  // Tworzenie obiektów dla każdego dnia tygodnia, nawet jeśli nie ma dla nich danych
  daysOfWeek.forEach((day) => {
    const dataForDay = sortedData[day] || 0;
    result.push({ day, clicks: dataForDay });
  });

  return result;
}
