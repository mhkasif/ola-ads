import { createNativeStackNavigator } from '@react-navigation/stack';
import RootNavigator from 'navigation/navigation';
import Toast from 'react-native-toast-message';
const Stack = createNativeStackNavigator();

const MainScreen = () => {
  return (
    <>
      <RootNavigator />
      <Toast />
    </>
  );
};

export default MainScreen;
