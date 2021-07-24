import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import shortid from 'shortid';

import {useNavigation} from '@react-navigation/native';

const Cards = ({image, price, name}) => {
  const navigation = useNavigation();

  const addItemToCart = async () => {
    try {
      const productToAdd = {
        id: shortid.generate(),
        image: image,
        price: price,
        name: name,
      };

      const storedValue = await AsyncStorage.getItem('@product_list');
      const prevList = await JSON.parse(storedValue);

      if (!prevList) {
        const newList = [productToAdd];
        await AsyncStorage.setItem('@product_list', JSON.stringify(newList));
      } else {
        prevList.push(productToAdd);
        await AsyncStorage.setItem('@product_list', JSON.stringify(prevList));
      }
      navigation.navigate('Cart');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <Image style={styles.image} source={image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>{price}$</Text>
      <TouchableOpacity style={styles.cartBtn} onPress={addItemToCart}>
        <Text style={{color: '#fff'}}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#99f2dd',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    marginTop: 10,
    borderRadius: 8,
    elevation: 1,
  },
  image: {
    resizeMode: 'cover',
    height: 90,
    width: 140,
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
