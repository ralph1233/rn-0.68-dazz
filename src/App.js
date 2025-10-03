import React, {PureComponent, createRef} from 'react';
import VisionCamera from './components/VisionCamera';
import Filters from './components/Filters';
import CapturedPhoto from './components/CapturedPhoto';
import {Camera} from 'react-native-vision-camera';
import {StyleSheet, SafeAreaView, ScrollView, Alert} from 'react-native';
import {imageFilters, width, height} from './utils/constants';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {drawAsImage, ImageFormat} from '@shopify/react-native-skia';
import RNFS from 'react-native-fs';

class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      device: null,
      selectedFilter: imageFilters[0],
      hasPermission: false,
      url: null,
    };

    this.cameraRef = createRef();
  }

  componentDidMount() {
    (async () => {
      try {
        const result = await request(PERMISSIONS.IOS.CAMERA);
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

  formatDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 0-11 → 1-12
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    // Pad month and day with leading zeros
    const paddedMonth = month.toString().padStart(2, '0');
    const paddedDay = day.toString().padStart(2, '0');

    return `${year}-${paddedMonth}-${paddedDay} ${hours}${minutes}${seconds}.${milliseconds}`;
  };

  takePhoto = async () => {
    try {
      const photo = await this.cameraRef.current.takePhoto();

      const {path} = photo;

      const MAX_DIMENSION = 2000;

      const {selectedFilter} = this.state;

      const {element} = imageFilters.find(
        imageFilter => imageFilter.name === selectedFilter.name,
      );

      const actualWidth = width * 0.9;
      const actualHeight = height * 0.3;

      const scaleFactor = Math.min(
        MAX_DIMENSION / actualWidth,
        MAX_DIMENSION / actualHeight,
      );

      const newWidth = Math.round(actualWidth * scaleFactor);
      const newHeight = Math.round(actualHeight * scaleFactor);

      const filteredElement = await element(path, newWidth, newHeight);

      // TODO: FIX THIS
      const skImage = await drawAsImage(filteredElement, {
        width: newWidth,
        height: newHeight,
      });

      const base64 = skImage.encodeToBase64(ImageFormat.JPEG);

      await RNFS.writeFile(path, base64, 'base64');

      const extension = path.split('.').pop();
      const directory = path.substring(0, path.lastIndexOf('/'));
      const newFileName = `${
        selectedFilter.name
      } ${this.formatDateTime()}.${extension}`;
      const newPath = `${directory}/${newFileName}`;

      await RNFS.moveFile(path, newPath);

      this.setState({
        url: newPath,
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
    const {device, url, selectedFilter, hasPermission} = this.state;

    if (!device) {
      return null;
    }

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

          <CapturedPhoto url={url} />
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
