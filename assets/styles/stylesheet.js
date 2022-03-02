import React from "react";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    box1: {
        position: 'absolute',
        top: 40,
        left: 40,
        width: 100,
        height: 100,
        backgroundColor: 'red'
    },
    box2: {
        ...StyleSheet.absoluteFill,
        width: 100,
        height: 100,
        backgroundColor: 'blue'
    },
    box3: {
        position: 'absolute',
        top: 120,
        left: 120,
        width: 100,
        height: 100,
        backgroundColor: 'green'
    },
    text: {
        color: '#FFF',
        fontSize: 80
    }
});

default export styles