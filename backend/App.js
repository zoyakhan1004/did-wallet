// App.js
const React = require("react");
const { NavigationContainer } = require("@react-navigation/native");
const { createStackNavigator } = require("@react-navigation/stack");
const { createBottomTabNavigator } = require("@react-navigation/bottom-tabs");
const { Ionicons } = require("@expo/vector-icons");
const { StyleSheet } = require("react-native");

// Screens
const WelcomeScreen = require("./src/screens/WelcomeScreen").default;
const LoginScreen = require("./src/screens/LoginScreen").default;
const RegisterScreen = require("./src/screens/RegisterScreen").default;
const AccountCreatedScreen = require("./src/screens/AccountCreatedScreen").default;
const VerificationScreen = require("./src/screens/VerificationScreen").default;
const ConnectionsScreen = require("./src/screens/ConnectionsScreen").default;
const CredentialsScreen = require("./src/screens/CredentialsScreen").default;
const SettingsScreen = require("./src/screens/SettingsScreen").default;
const NotificationScreen = require("./src/screens/NotificationScreen").default;
const AddCustomNetworkScreen = require("./src/screens/AddCustomNetworkScreen").default;

// Stack and Tab Navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Connections Stack
const ConnectionsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Connections"
      component={ConnectionsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="NotificationScreen"
      component={NotificationScreen}
      options={{ title: "Notifications" }}
    />
    <Stack.Screen
      name="AddCustomNetworkScreen"
      component={AddCustomNetworkScreen}
      options={{ title: "Adding Custom Network" }}
    />
  </Stack.Navigator>
);

// Tab Navigator for Home (Post-Login)
const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === "ConnectionsStack") iconName = "people-outline";
        else if (route.name === "Credentials") iconName = "card-outline";
        else if (route.name === "Settings") iconName = "settings-outline";
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#6200EE",
      tabBarInactiveTintColor: "gray",
      headerShown: false, // Hide individual tab headers
    })}
  >
    <Tab.Screen
      name="ConnectionsStack"
      component={ConnectionsStack}
      options={{ title: "Connections" }}
    />
    <Tab.Screen name="Credentials" component={CredentialsScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

// Main App Navigation
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
        {/* <Stack.Screen name="ProofScreen" component={ProofScreen} />
        <Stack.Screen name="CredentialDetailsScreen" component={CredentialDetailsScreen} /> */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

module.exports = App;
