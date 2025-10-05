/* eslint-disable prettier/prettier */
import React, {PureComponent, createRef} from 'react';
import VisionCamera from './components/VisionCamera';
import Filters from './components/Filters';
import {Camera} from 'react-native-vision-camera';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import {imageFilters} from './utils/constants';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import RNFS from 'react-native-fs';

class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      device: null,
      selectedFilter: imageFilters[0],
      hasPermission: false,
      base64: null,
    };

    this.cameraRef = createRef();
  }

  componentDidMount() {
    (async () => {
      try {
        const result = await request(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.CAMERA
            : PERMISSIONS.ANDROID.CAMERA,
        );
        if (result !== RESULTS.GRANTED) {
          return;
        }
        const devices = await Camera.getAvailableCameraDevices();
        const backDevice = devices.find(device => device.position === 'back');
        this.setState({
          hasPermission: true,
          device: backDevice,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }

  takePhoto = async () => {
    try {
      const photo = await this.cameraRef.current.takePhoto();

      const {path} = photo;

      const base64 = await RNFS.readFile(path, 'base64');

      this.setState({
        base64,
      });
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  setSelectedFilter = filter => {
    this.setState({
      selectedFilter: filter,
    });
  };

  render() {
    const {device, base64, selectedFilter, hasPermission} = this.state;

    if (!device) {
      return null;
    }

    const {Element} = imageFilters.find(
      imageFilter => imageFilter.name === selectedFilter.name,
    );

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <VisionCamera
            device={device}
            takePhoto={this.takePhoto}
            cameraRef={this.cameraRef}
            hasPermission={hasPermission}
          />

          <Filters
            setSelectedFilter={this.setSelectedFilter}
            selectedFilter={selectedFilter}
          />

          <Element base64={base64} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
