import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import EmptyCart from '../component/EmptyCart';

import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';

const CartScreen = () => {
  const [listOfProduct, setListOfProduct] = useState();
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const getProductList = async () => {
    setLoading(true);
    const storedValue = await AsyncStorage.getItem('@product_list');
    console.log(storedValue);
    if (!storedValue) {
      setListOfProduct([]);
    }
    const storeList = JSON.parse(storedValue);
    setListOfProduct(storeList);
    setLoading(false);
  };

  const removeProduct = async id => {
    const newList = listOfProduct.filter(list => list.id !== id);
    await AsyncStorage.setItem('@product_list', JSON.stringify(newList));
    setListOfProduct(newList);
  };

  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
    getProductList();
    Alert.alert('Order Placed Successfully', 'will delivered soon', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  useEffect(() => {
    getProductList();
    // TotalItems();
  }, [isFocused]);

  if (loading) {
    return (
      <View style={{flex: 1}}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      {listOfProduct?.length == 0 ? (
        <EmptyCart />
      ) : (
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              paddingVertical: 15,
            }}>
            <Text style={{fontSize: 16, fontFamily: 'Poppins-Medium'}}>
              Selected Items
            </Text>
            <Text> {listOfProduct?.length} Items</Text>
          </View>

          {listOfProduct?.map((product, index) => (
            <View style={styles.cardContainer} key={index}>
              <Image style={styles.image} source={product.image} />
              <View>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>{product.price}$</Text>
              </View>
              <TouchableOpacity
                style={styles.cartBtn}
                onPress={() => removeProduct(product.id)}>
                <Text style={{color: '#fff'}}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}

          <View
            style={{
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18}}>
              Price:{' '}
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                {listOfProduct?.reduce((sum, i) => (sum += i.price), 0)}$
              </Text>
            </Text>
            <TouchableOpacity
              style={{
                paddingHorizontal: 25,
                paddingVertical: 7,
                borderRadius: 5,
                backgroundColor: '#2e0547',
                marginTop: 10,
              }}
              onPress={clearAsyncStorage}>
              <Text style={{color: '#fff'}}>Pay</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#99f2dd',
    padding: 15,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
    marginTop: 10,
    borderRadius: 8,
  },
  image: {
    resizeMode: 'cover',
    height: 60,
    width: 100,
  },
  name: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 8,
    textTransform: 'uppercase',
  },
  price: {
    textAlign: 'center',
    fontWeight: '100',
  },
  cartBtn: {
    backgroundColor: '#14785a',
    marginTop: 8,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 5,
  },
});
