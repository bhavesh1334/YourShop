import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  SafeAreaView,
} from 'react-native';
import filter from 'lodash.filter';
import Cards from '../component/ItemCard';

const items = [
  {
    name: 'CoolPad',
    image: require(`../assets/images/mob1.jpg`),

    price: 480,
  },
  {
    name: 'Doodle',
    image: require(`../assets/images/mob5.jpg`),

    price: 660,
  },

  {
    name: 'Doodle4',
    image: require(`../assets/images/mob7.jpg`),

    price: 700,
  },

  {
    name: 'nikon',
    image: require(`../assets/images/cam1.jpg`),

    price: 500,
  },

  {
    name: 'canon',
    image: require('../assets/images/cam2.jpg'),
    price: 600,
  },

  {
    name: 'sony',
    image: require('../assets/images/cam3.jpg'),
    price: 300,
  },
  {
    name: 'lumix',
    image: require('../assets/images/cam4.jpg'),
    price: 700,
  },
  {
    name: 'LG',
    image: require('../assets/images/cam5.jpg'),
    price: 320,
  },
  {
    name: 'sony',
    image: require('../assets/images/cam6.jpg'),
    price: 540,
  },
  {
    name: 'canon',
    image: require('../assets/images/cam7.jpg'),
    price: 600,
  },
  {
    name: 'nikon',
    image: require('../assets/images/cam8.jpg'),
    price: 370,
  },
];

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState(items);

  const handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(items, item => {
      return contains(item, formattedQuery);
    });
    setFullData(filteredData);
    setQuery(text);
  };

  const contains = ({name}, query) => {
    if (name.includes(query)) {
      return true;
    }

    return false;
  };

  const renderSearchBar = () => {
    return (
      <>
        <Text style={styles.itemTitle}>Products</Text>
        <View
          style={{
            backgroundColor: '#fff',
            padding: 2,
            marginVertical: 6,
            borderRadius: 8,
            marginHorizontal: 8,
          }}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            status="info"
            value={query}
            onChangeText={queryText => handleSearch(queryText)}
            placeholder="Search"
            style={{backgroundColor: '#fff', paddingHorizontal: 20}}
          />
        </View>
      </>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        ListHeaderComponent={renderSearchBar}
        data={fullData}
        renderItem={({item}) => (
          <Cards image={item.image} price={item.price} name={item.name} />
        )}
        keyExtractor={(item, index) => index}
        numColumns={2}
      />

      <View style={{height: 50, width: '100%'}} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemTitle: {
    fontFamily: 'Poppins-Bold',
    marginLeft: 10,
    fontSize: 20,
  },
});
