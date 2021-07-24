import React from 'react';
import {View, Text} from 'react-native';

const EmptyCart = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          backgroundColor: '#bdf0d7',
          paddingHorizontal: 50,
          paddingVertical: 30,
          borderRadius: 10,
          elevation: 2,
        }}>
        <Text style={{fontSize: 18}}>No Items in cart as of now</Text>
      </View>
    </View>
  );
};

export default EmptyCart;
