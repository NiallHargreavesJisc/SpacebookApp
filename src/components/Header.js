import React from 'react';
import {View, Image, Text} from 'react-native';
import styles from "../assets/styles/Style";


const Header = () => {

    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>SPACEBOOK</Text>
        </View>
    )
}

export default Header