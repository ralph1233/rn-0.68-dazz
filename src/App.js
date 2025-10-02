import React, {PureComponent} from 'react';
import VisionCamera from './components/VisionCamera';
import Filters from './components/Filters';
import CapturedPhoto from './components/CapturedPhoto';
import {Camera} from 'react-native-vision-camera';
import {StyleSheet, SafeAreaView} from 'react-native';

class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      device: null,
      selectedFilter: 'Arabica',
      url: null,
    };
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
        <VisionCamera device={device} />
        <Filters />
        <CapturedPhoto url={url} />
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
