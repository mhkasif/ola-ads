import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from '@react-navigation/native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ListOfGroups from 'screens/ListOfGroupsScreen/ListOfGroupsScreen';
import UserProfile from 'screens/UserProfileScreen/UserProfileScreen';
import {SCREEN_NAMES} from 'screens/screenNames';

const renderIcon = ({route, color, size}) => {
  let iconName;

  switch (route.name) {
    case SCREEN_NAMES.POSTS:
      iconName = 'image';
      break;
    case SCREEN_NAMES.HOME:
      iconName = 'home';
      break;
    case SCREEN_NAMES.PLANS:
      iconName = 'attach-money';
      break;
    case SCREEN_NAMES.CREATE_POST:
      iconName = 'add';
      break;
    case SCREEN_NAMES.PROFILE:
      iconName = 'person';
      break;
  }

  return <Icon name={iconName} size={size} color={color} />;
};
const BottomTabNavigator = ({route}) => {
  const Tab = createBottomTabNavigator();
  let focusedRoute = getFocusedRouteNameFromRoute(route);
  console.log(focusedRoute, route);
  const [isFABOpen, setIsFABOpen] = useState(false);
  const {navigate} = useNavigation();
  const openFAB = () => {
    setIsFABOpen(true);
  };
  const closeFAB = () => {
    setIsFABOpen(false);
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          // headerShown: false,
          headerTitleAlign: 'center',
          headerStyle: {
            height: 100,
            backgroundColor: 'transparent',
          },
          headerBackground: () => (
            <LinearGradient
              colors={['#72439A', '#13C2EE']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{flex: 1}}
            />
          ),
          headerTintColor: '#fff',

          tabBarItemStyle: {
            marginHorizontal: 20,
            borderTopWidth: (focusedRoute || 'Home') === route.name ? 2 : 0,
            borderColor: '#0C0F3D',
          },
          tabBarIcon: props => renderIcon({route, ...props}),
          tabBarActiveTintColor: '#0C0F3D',
          tabBarStyle: [
            {
              display: 'flex',
            },
            null,
          ],
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name={SCREEN_NAMES.HOME} component={ListOfGroups} />

        <Tab.Screen name={SCREEN_NAMES.POSTS} component={ListOfGroups} />

        {/* <Tab.Screen name={SCREEN_NAMES.P} component={PlansScreen} /> */}
        <Tab.Screen name={SCREEN_NAMES.PROFILE} component={UserProfile} />
      </Tab.Navigator>
    </>
  );
};
export default BottomTabNavigator;
