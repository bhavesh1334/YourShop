import * as React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import HomeScreen from './src/screens/HomeScreen';
import CartScreen from './src/screens/CartScreen';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="ITEMS" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

const CartStack = createStackNavigator();

function CartStackScreen() {
  return (
    <CartStack.Navigator>
      <CartStack.Screen name="CART" component={CartScreen} />
    </CartStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Cart') {
              iconName = 'shopping-bag';
            }

            return (
              <View>
                <Feather name={iconName} color={color} size={32} />
              </View>
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: '#2e0547',
          inactiveTintColor: '#7589bd',
        }}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Cart" component={CartStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
