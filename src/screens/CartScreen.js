import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from '../store/cartSlice';
import CartItem from '../components/CartItem';

const CartScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const platformFee = 5;
  const total = subtotal + platformFee;

  const handlePlaceOrder = () => {
    Alert.alert('Order Placed Successfully', 'Thank you for your purchase!', [
      {
        text: 'OK',
        onPress: () => {
          dispatch(clearCart());
        },
      },
    ]);
  };

  const renderFooter = () => (
    <View style={styles.priceDetails}>
      <Text style={styles.sectionTitle}>Price Details:</Text>
      <View style={styles.priceRow}>
        <Text>Price:</Text>
        <Text>₹{subtotal}</Text>
      </View>
      <View style={styles.priceRow}>
        <Text>Platform Fee:</Text>
        <Text>₹{platformFee}</Text>
      </View>
      <View style={[styles.priceRow, styles.totalRow]}>
        <Text style={styles.totalText}>Total Amount:</Text>
        <Text style={styles.totalText}>₹{total}</Text>
      </View>

      <TouchableOpacity
        style={styles.placeOrderButton}
        onPress={handlePlaceOrder}
      >
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <View style={[styles.emptyContainer, { paddingTop: insets.top }]}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onIncrement={() => dispatch(incrementQuantity(item.id))}
            onDecrement={() => dispatch(decrementQuantity(item.id))}
            onRemove={() => dispatch(removeFromCart(item.id))}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
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
  priceDetails: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  placeOrderButton: {
    backgroundColor: 'tomato',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CartScreen;
