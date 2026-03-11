import React, { Fragment } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import WishListScreen from '../screens/WishListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Bottom Tabs
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'shopping-cart';
          else if (route.name === 'Cart') iconName = 'bar-chart';
          else if (route.name === 'Wishlist') iconName = 'favorite-border';
          else if (route.name === 'Profile') iconName = 'person';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Wishlist" component={WishListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Custom Drawer Content
function CustomDrawerContent(props) {
  const { navigation } = props;
  return (
    <Fragment>
      <View style={styles.drawerHeader}>
        <Text style={styles.appName}>Step Style</Text>
      </View>
      <DrawerItem
        label="Home"
        icon={({ color, size }) => (
          <Icon name="shopping-cart" color={color} size={size} />
        )}
        onPress={() => {
          navigation.navigate('MainTabs', { screen: 'Home' });
          navigation.closeDrawer();
        }}
      />
      <DrawerItem
        label="Cart"
        icon={({ color, size }) => (
          <Icon name="bar-chart" color={color} size={size} />
        )}
        onPress={() => {
          navigation.navigate('MainTabs', { screen: 'Cart' });
          navigation.closeDrawer();
        }}
      />
      <DrawerItem
        label="Wishlist"
        icon={({ color, size }) => (
          <Icon name="favorite-border" color={color} size={size} />
        )}
        onPress={() => {
          navigation.navigate('MainTabs', { screen: 'Wishlist' });
          navigation.closeDrawer();
        }}
      />
      <DrawerItem
        label="Profile"
        icon={({ color, size }) => (
          <Icon name="person" color={color} size={size} />
        )}
        onPress={() => {
          navigation.navigate('MainTabs', { screen: 'Profile' });
          navigation.closeDrawer();
        }}
      />
    </Fragment>
  );
}

// Drawer Navigator
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerTintColor: '#000',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{ marginLeft: 15, marginRight: 15 }}
          >
            <Icon name="menu" size={24} color="#000" />
          </TouchableOpacity>
        ),
        headerTitle: 'Step Style',
      })}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
    </Drawer.Navigator>
  );
}

// Root Stack Navigator
export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ headerShown: true, title: 'Product Details' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});
