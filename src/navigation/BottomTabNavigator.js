/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import FAB from '@components/CustomFAB/CustomFAB';
import CustomHeader from '@components/CustomHeader/CustomHeader';
import MaterialIcon from '@components/MaterialIcon/MaterialIcon';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  getFocusedRouteNameFromRoute,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { headerOptions } from '@utils/helpers';
import { Box } from 'native-base';
import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChangePasswordScreen from 'screens/ChangePasswordScreen/ChangePasswordScreen';
import EditProfile from 'screens/EditProfile/EditProfile';
import HomeScreen from 'screens/HomeScreen/HomeScreen';
import ListOfPostsScreen from 'screens/ListOfPostsScreen/ListOfPostsScreen';
import Plans from 'screens/PlansScreen/PlansScreen';
import UserProfile from 'screens/UserProfileScreen/UserProfileScreen';
import { SCREEN_NAMES } from 'screens/screenNames';
const header = ({route: {name}, ...props}) => {
  // console.log(props);
  return <CustomHeader title={name} {...props} />;
};
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
    case SCREEN_NAMES.CREATE_AD:
      iconName = 'add';
      break;
    case '_' + SCREEN_NAMES.PROFILE:
      iconName = 'person';
      break;
  }

  return <Icon name={iconName} size={size} color={color} />;
};
const BottomTabNavigator = ({route, ...props}) => {
  const Tab = createBottomTabNavigator();
  const ProfileStack = createNativeStackNavigator();
  let focusedRoute = getFocusedRouteNameFromRoute(route);
  // console.log({focusedRoute}, props);
  const {navigate} = useNavigation();
  const isFocused = useIsFocused();
  // console.log(isFocused);
  const ProfileStackScreens = useCallback(
    () => (
      <ProfileStack.Navigator
        screenOptions={{
          // ...headerOptions,
          header,
        }}>
        <ProfileStack.Screen
          name={SCREEN_NAMES.PROFILE}
          component={UserProfile}
          options={{
            backIcon: false,
            headerRight: () => (
              <Box
                style={{
                  marginRight: 20,
                }}>
                <Icon
                  as={MaterialIcon}
                  name="edit"
                  size={20}
                  color="#fff"
                  onPress={() => navigate(SCREEN_NAMES.EDIT_PROFILE)}
                />
              </Box>
            ),
          }}
        />

        <ProfileStack.Screen
          name={SCREEN_NAMES.CHANGE_PASSWORD}
          component={ChangePasswordScreen}
        />
        <ProfileStack.Screen
          name={SCREEN_NAMES.EDIT_PROFILE}
          component={EditProfile}
        />
        <ProfileStack.Screen name={SCREEN_NAMES.PLANS} component={Plans} />
      </ProfileStack.Navigator>
    ),
    [],
  );
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarItemStyle: {
            marginHorizontal: 20,
            borderTopWidth:  2,
            borderColor: (focusedRoute || 'Home') === route.name ?'#0C0F3D':'transparent',
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
        <Tab.Screen
          name={SCREEN_NAMES.HOME}
          component={HomeScreen}
          options={{
            ...headerOptions,
            header: ({route: {name}}) => (
              <CustomHeader
                options={{
                  backIcon: false,
                }}
                title={name}
              />
            ),
          }}
        />

        <Tab.Screen
          name={SCREEN_NAMES.POSTS}
          component={ListOfPostsScreen}
          options={{
            ...headerOptions,
            header: ({route: {name}}) => (
              <CustomHeader
                options={{
                  backIcon: false,
                }}
                title={name}
              />
            ),
          }}
        />

        {/* <Tab.Screen name={SCREEN_NAMES.P} component={PlansScreen} /> */}
        <Tab.Screen
          name={'_' + SCREEN_NAMES.PROFILE}
          component={ProfileStackScreens}
          options={{
            tabBarLabel: SCREEN_NAMES.PROFILE,
          }}
        />
      </Tab.Navigator>

      {isFocused &&
        [SCREEN_NAMES.POSTS, SCREEN_NAMES.HOME, undefined].includes(
          focusedRoute,
        ) && (
          <FAB
            shadow={2}
            // bottom={5}
            size="lg"
            bottom={20}
            onPress={() => navigate(SCREEN_NAMES.CREATE_AD)}>
            <Icon
              color="white"
              as={MaterialIcon}
              name="add"
              style={{
                fontSize: 20,
              }}
            />
          </FAB>
        )}
    </>
  );
};
export default BottomTabNavigator;
