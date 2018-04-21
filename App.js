import * as Expo from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './src/homeScreen';
import CameraScreen from './src/cameraScreen';
import GalleryScreen from './src/galleryScreen';

const RootStack = StackNavigator({
    Homescreen: { screen: HomeScreen },
    Camerascreen: { screen: CameraScreen },
    Galleryscreen: { screen: GalleryScreen }
  },
  {
    initialRouteName: "Homescreen",
    headerMode: "none"
  }
);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  componentWillMount() {
    this.loadFonts();
  }

  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({ isReady: true});
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />
    }

    return (
      
        <RootStack />
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      android: {
        marginTop: 20
      }
    })
  },
});
