import React, {PureComponent, createRef} from 'react';
import VisionCamera from '../components/VisionCamera';
import Filters from '../components/Filters';
import {SafeAreaView, ScrollView, StyleSheet, Platform} from 'react-native';
import {Camera as _Camera} from 'react-native-vision-camera';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {AppContext} from '../utils/constants';

class Camera extends PureComponent {
  static contextType = AppContext;

  constructor() {
    super();

    this.state = {
      device: null,
      hasPermission: false,
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
        const devices = await _Camera.getAvailableCameraDevices();
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

  render() {
    const {device, hasPermission} = this.state;
    const {selectedFilter, setSelectedFilter, takePhoto} = this.context;
    const {navigation} = this.props;

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
            takePhoto={takePhoto}
            cameraRef={this.cameraRef}
            hasPermission={hasPermission}
            navigation={navigation}
          />

          <Filters
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
