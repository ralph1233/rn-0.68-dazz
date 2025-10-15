import React, {PureComponent} from 'react';
import {SafeAreaView, StyleSheet, Image, Alert} from 'react-native';
import {removeBackground} from 'react-native-background-remover';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

class Collage extends PureComponent {
  componentDidMount() {
    (async () => {
      try {
      } catch (error) {
        console.log(error);
        Alert.alert('Error', error.message);
      }
    })();
  }

  render() {
    return <SafeAreaView style={styles.container}></SafeAreaView>;
  }
}

export default Collage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
