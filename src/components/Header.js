import React from 'react';
import { View, Text } from 'react-native';
import styles from '../assets/styles/Style';

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>SPACEBOOK</Text>
    </View>
  );
}

export default Header;
