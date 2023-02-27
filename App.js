import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from "@expo/vector-icons";
import Home from './src/Home';
import NoteAdd from './src/NoteAdd';
import Header from './src/Header';
import Detail from './src/Detail';
import Login from './src/Login';
import Registration from './src/Registration';
import Dashboard from './src/Dashboard';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: 'white',
          headerBackImage: () => (
            <Ionicons name="arrow-back" size={40} color="white" />
          ),
        }}
      >
        <Stack.Screen
          component={Home}
          name="Home"
          options={{
            headerTitle: () => <Header name="Notes"/>,
            headerStyle: {
              backgroundColor:"orange",
              height:120,
            }
          }}
        />
           <Stack.Screen
            component={NoteAdd}
            name="NoteAdd"
            options={{
            headerTitle: () => <Header name="Add Notes"/>,
              headerStyle: {
              backgroundColor:"orange",
              height:120,
            }
          }}
        />
        <Stack.Screen
            component={Detail}
            name="Detail"
            options={{
            headerTitle: () => <Header name="Edit Notes"/>,
              headerStyle: {
              backgroundColor:"orange",
              height:120,
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}