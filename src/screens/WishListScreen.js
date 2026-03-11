import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../store/wishlistSlice';
import { addToCart } from '../store/cartSlice';
import WishlistItem from '../components/WishlistItem';

const WishListScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);

  const handleMoveToCart = item => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item.id));
    Alert.alert('Moved', 'Item moved to cart');
  };

  if (wishlistItems.length === 0) {
    return (
      <View style={[styles.emptyContainer, { paddingTop: insets.top }]}>
        <Text style={styles.emptyText}>Your wishlist is empty</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={wishlistItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <WishlistItem
            item={item}
            onRemove={() => dispatch(removeFromWishlist(item.id))}
            onMoveToCart={() => handleMoveToCart(item)}
          />
        )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});

export default WishListScreen;
