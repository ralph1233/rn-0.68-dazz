import React, {PureComponent, createRef} from 'react';
import VisionCamera from './components/VisionCamera';
import Filters from './components/Filters';
import CapturedPhoto from './components/CapturedPhoto';
import {Camera} from 'react-native-vision-camera';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';

class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      device: null,
      selectedFilter: 'Arabica',
      url: null,
    };

    this.cameraRef = createRef();
  }

  componentDidMount() {
    (async () => {
      try {
        const devices = await Camera.getAvailableCameraDevices();
        const backDevice = devices.find(device => device.position === 'back');
        this.setState({
          device: backDevice,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }

  takePhoto = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  setSelectedFilter = filter => {
    this.setState({
      selectedFilter: filter,
    });
  };

  render() {
    const {device, url} = this.state;

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
          />
          <Filters />
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
