import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';

import { useAuth } from '../contexts/AuthContext';
import { useCity } from '../contexts/CityContext';
import { CartScreen } from '../screens/CartScreen';
import { CategoryShopsScreen } from '../screens/CategoryShopsScreen';
import { CitySelectionScreen } from '../screens/CitySelectionScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { OrdersScreen } from '../screens/OrdersScreen';
import { OtpVerifyScreen } from '../screens/OtpVerifyScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { ShopDetailsScreen } from '../screens/ShopDetailsScreen';
import { ShopListingScreen } from '../screens/ShopListingScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { SubcategoryProductsScreen } from '../screens/SubcategoryProductsScreen';
import { AuthStackParamList, HomeStackParamList, MainTabParamList } from './types';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const CityStack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="OtpVerify" component={OtpVerifyScreen} />
    </AuthStack.Navigator>
  );
}

function CityNavigator() {
  return (
    <CityStack.Navigator screenOptions={{ headerShown: false }}>
      <CityStack.Screen name="CitySelection" component={CitySelectionScreen} />
    </CityStack.Navigator>
  );
}

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="CategoryShops" component={CategoryShopsScreen} />
      <HomeStack.Screen name="ShopListing" component={ShopListingScreen} />
      <HomeStack.Screen name="ShopDetails" component={ShopDetailsScreen} />
      <HomeStack.Screen name="SubcategoryProducts" component={SubcategoryProductsScreen} />
    </HomeStack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen name="Home" component={HomeNavigator} />
      <Tabs.Screen name="Search" component={SearchScreen} />
      <Tabs.Screen name="Cart" component={CartScreen} />
      <Tabs.Screen name="Orders" component={OrdersScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}

export function RootNavigator() {
  const { city, isHydrated: cityHydrated } = useCity();
  const { isAuthenticated, isHydrated: authHydrated } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash || !cityHydrated || !authHydrated) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {!city ? <CityNavigator /> : !isAuthenticated ? <AuthNavigator /> : <MainTabNavigator />}
    </NavigationContainer>
  );
}
