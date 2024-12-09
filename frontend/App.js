import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
// Screens
import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import AccountCreatedScreen from "./src/screens/AccountCreatedScreen";
import VerificationScreen from "./src/screens/VerificationScreen";
import ConnectionsScreen from "./src/screens/ConnectionsScreen";
import CredentialsScreen from "./src/screens/CredentialsScreen";
import AddCredentialScreen from "./src/screens/AddCredentialScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import NotificationScreen from "./src/screens/NotificationScreen";
import AddCustomNetworkScreen from "./src/screens/AddCustomNetworkScreen";

// Stack and Tab Navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Credentials Stack
const CredentialsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="CredentialsScreen"
      component={CredentialsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="AddCredential"
      component={AddCredentialScreen}
      options={{ title: "Add Credential" }}
    />
    <Stack.Screen
      name="AddCustomNetworkScreen"
      component={AddCustomNetworkScreen}
      options={{ title: "Add Custom Network" }}
    />
  </Stack.Navigator>
);

// Connections Stack with Notifications
const ConnectionsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ConnectionsScreen"
      component={ConnectionsScreen}
      options={({ navigation }) => ({
        headerRight: () => (
          <Ionicons
            name="notifications-outline"
            size={24}
            color="black"
            style={{ marginRight: 15 }}
            onPress={() => navigation.navigate("NotificationScreen")}
          />
        ),
        title: "Connections",
      })}
    />
    <Stack.Screen
      name="NotificationScreen"
      component={NotificationScreen}
      options={{ title: "Notifications" }}
    />
  </Stack.Navigator>
);

// Tab Navigator for Home
const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === "ConnectionsStack") iconName = "people-outline";
        else if (route.name === "CredentialsStack") iconName = "card-outline";
        else if (route.name === "Settings") iconName = "settings-outline";
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#6200EE",
      tabBarInactiveTintColor: "gray",
      headerShown: false,
    })}
  >
    <Tab.Screen
      name="ConnectionsStack"
      component={ConnectionsStack}
      options={{ title: "Connections" }}
    />
    <Tab.Screen
      name="CredentialsStack"
      component={CredentialsStack}
      options={{ title: "Credentials" }}
    />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {/* Onboarding Screens */}
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Register" }}
        />
        <Stack.Screen
          name="AccountCreated"
          component={AccountCreatedScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Verification"
          component={VerificationScreen}
          options={{ title: "Verification" }}
        />

        {/* Home Tabs */}
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
