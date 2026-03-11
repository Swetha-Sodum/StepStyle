import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { profilePic } from '../utils/AllImages';

const defaultAvatar = profilePic;

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();

  const user = {
    name: 'Swetha Sodum',
    email: 'swetha.sodum@example.com',
    avatar: defaultAvatar,
  };

  const options = [
    { id: '1', icon: 'shopping-bag', label: 'My Orders', screen: 'Orders' },
    { id: '2', icon: 'location-on', label: 'Addresses', screen: 'Addresses' },
    { id: '3', icon: 'payment', label: 'Payment Methods', screen: 'Payments' },
    { id: '4', icon: 'favorite', label: 'Wishlist', screen: 'Wishlist' },
    { id: '5', icon: 'settings', label: 'Settings', screen: 'Settings' },
    { id: '6', icon: 'help', label: 'Help & Support', screen: 'Help' },
  ];

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Image source={user.avatar} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {options.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.optionRow}
            onPress={() => {
              console.log(`Navigate to ${item.screen}`);
            }}
          >
            <Icon name={item.icon} size={24} color="#555" />
            <Text style={styles.optionLabel}>{item.label}</Text>
            <Icon name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Icon name="logout" size={20} color="#ff6b6b" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#ddd',
    resizeMode: 'contain',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#eee',
  },
  optionsContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#ff6b6b',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#ff6b6b',
    fontWeight: '500',
  },
});

export default ProfileScreen;
