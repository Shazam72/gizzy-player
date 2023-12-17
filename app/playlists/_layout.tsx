import { View, Text } from "react-native";
import React, { createContext, useState } from "react";
import { Stack } from "expo-router";
import color from "../../configs/color"
import { PlaylistContextProvider } from "../../contexts/playlist";

export default function _layout() {
  return (
    <PlaylistContextProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#d4a7d4",
          },
          headerTitleStyle: {
            color: color.black,
          },
        }}
      />
    </PlaylistContextProvider>
  );
}
