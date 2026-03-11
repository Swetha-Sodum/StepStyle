import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { addToWishlist } from '../store/wishlistSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProductDetailsScreen = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const { product } = route.params || {};
  const dispatch = useDispatch();

  if (!product) {
    return (
      <View style={[styles.center, { paddingTop: insets.top }]}>
        <Text>Product not found</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    Alert.alert('Success', 'Item added to cart!');
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
    Alert.alert('Success', 'Item added to wishlist!');
  };
  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Image source={product.image} style={styles.image} resizeMode="contain" />

      <View style={styles.header}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>₹{product.price}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.wishlistButton]}
          onPress={handleAddToWishlist}
        >
          <Icon name="favorite-border" size={20} color="#ff6b6b" />
          <Text style={styles.wishlistText}>Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cartButton]}
          onPress={handleAddToCart}
        >
          <Icon name="shopping-cart" size={20} color="#fff" />
          <Text style={styles.cartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Options</Text>
        <View style={styles.infoRow}>
          <Icon name="local-shipping" size={20} color="#555" />
          <Text style={styles.infoText}>Express Delivery Available</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="payments" size={20} color="#555" />
          <Text style={styles.infoText}>Pay On Delivery Available</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="autorenew" size={20} color="#555" />
          <Text style={styles.infoText}>7 Days Return & Exchange</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#f9f9f9',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    fontSize: 22,
    color: '#e67e22',
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 0.45,
  },
  wishlistButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff6b6b',
  },
  wishlistText: {
    marginLeft: 8,
    color: '#ff6b6b',
    fontWeight: '500',
  },
  cartButton: {
    backgroundColor: '#e67e22',
  },
  cartText: {
    marginLeft: 8,
    color: '#fff',
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fafafa',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#333',
  },
});

export default ProductDetailsScreen;
