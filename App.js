import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PesertaDetailScreen from "./src/screens/PesertaDetailScreen";
import PesertaFormScreen from "./src/screens/PesertaFormScreen";
import PesertaListScreen from "./src/screens/PesertaListScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PesertaList"
          component={PesertaListScreen}
          options={{ title: "Data Peserta" }}
        />

        <Stack.Screen
          name="PesertaForm"
          component={PesertaFormScreen}
          options={{ title: "Form Peserta" }}
        />

        <Stack.Screen
          name="PesertaDetail"
          component={PesertaDetailScreen}
          options={{ title: "Detail Peserta" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}