import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';



const App = () => {
  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
};

export default App;
