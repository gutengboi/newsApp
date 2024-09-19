import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import NewsScreen from "@/screens/NewsScreen";
import AboutScreen from "@/screens/AboutScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="News">
      <Drawer.Screen
        name="News"
        component={NewsScreen}
        options={{ title: "Top Stories" }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{ title: "About Me" }}
      />
    </Drawer.Navigator>
  );
}
