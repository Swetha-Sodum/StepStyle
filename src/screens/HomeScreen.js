import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductCard from '../components/ProductCard';
import {
  gymShoes,
  hikingShoes,
  leatherShoes,
  lightUpShoes,
  runningShoes,
  sneakers,
  whiteShoes,
  yellowShoes,
} from '../utils/AllImages';

const products = [
  {
    id: '1',
    name: 'Running Shoes',
    price: 699,
    rating: 3.4,
    review: '1k',
    image: runningShoes,
  },
  {
    id: '2',
    name: 'White Shoes',
    price: 659,
    rating: 3.7,
    review: '1.5k',
    image: whiteShoes,
  },
  {
    id: '3',
    name: 'Sneakers',
    price: 999,
    rating: 4.2,
    review: '2.5k',
    image: sneakers,
  },
  {
    id: '4',
    name: 'Yellow Shoes',
    price: 849,
    rating: 4,
    review: '1.4k',
    image: yellowShoes,
  },
  {
    id: '5',
    name: 'Gym Shoes',
    price: 799,
    rating: 4.1,
    review: '3.7k',
    image: gymShoes,
  },
  {
    id: '6',
    name: 'Leather Shoes',
    price: 1199,
    rating: 3.6,
    review: '2.2k',
    image: leatherShoes,
  },
  {
    id: '7',
    name: 'Light-Up Shoes',
    price: 769,
    rating: 4.8,
    review: '3k',
    image: lightUpShoes,
  },
  {
    id: '8',
    name: 'Hiking Shoes',
    price: 1499,
    rating: 3.9,
    review: '1.5k',
    image: hikingShoes,
  },
];

const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    justifyContent: 'space-between',
  },
  listContent: {
    paddingHorizontal: 6,
  },
});

export default HomeScreen;
