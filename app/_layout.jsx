import { Tabs } from "expo-router";
import colors from "../configs/color";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { MediaContextProvider } from "../contexts/media";
import { PlayerContextProvider } from "../contexts/player";

const options = {
  tabBarLabelStyle: {
    fontWeight: "bold",
    fontSize: 13,
  },
};

export default function AppLayout() {
  return (
    <MediaContextProvider>
      <PlayerContextProvider>
        <Tabs
          screenOptions={{
            headerStyle: {
              backgroundColor: "#d4a7d4",
            },
            headerTitleStyle: {
              color: colors.black,
            },
            tabBarActiveTintColor: colors.primary,
            tabBarShowLabel: false
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
                  size={25}
                  color={focused ? colors.primary : "black"}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="player"
            options={{
              title: "Écouter",
              headerShown: false,
              ...options,
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name="md-headset-sharp"
                  size={25}
                  color={focused ? colors.primary : "black"}
                />
              ),
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
                  size={25}
                  color={focused ? colors.primary : "black"}
                />
              ),
            }}
          />
        </Tabs>
      </PlayerContextProvider>
    </MediaContextProvider>
  );
}
