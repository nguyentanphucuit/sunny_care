import ConsentScreen from "@/components/ConsentDialog";
import { Stack } from "expo-router";
import React from "react";

export default function ConsentRoute() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Consent",
          headerShown: true,
        }}
      />
      <ConsentScreen />
    </>
  );
}
