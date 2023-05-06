import { Tabs } from "expo-router";
import colors from "../configs/color";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { MediaContextProvider } from "../contexts/media";

const options = {
  tabBarLabelStyle: {
    fontWeight: "bold",
    fontSize: 13,
  },
};

export default function AppLayout() {
  return (
    <MediaContextProvider>
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: "#d4a7d4",
          },
          headerTitleStyle: {
            color: colors.black,
          },
          tabBarActiveTintColor: colors.primary,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Bibliothèque",
            ...options,
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="my-library-music"
                size={20}
                color={focused ? colors.primary : "black"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="player"
          options={{
            title: "Écouter",
            ...options,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="md-headset-sharp"
                size={20}
                color={focused ? colors.primary : "black"}
              />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="playlists"
          options={{
            title: "Playlists",
            ...options,
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="my-library-music"
                size={20}
                color={focused ? colors.primary : "black"}
              />
            ),
          }}
        />
      </Tabs>
    </MediaContextProvider>
  );
}
