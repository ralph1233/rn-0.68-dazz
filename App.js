import {PureComponent} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import {request, PERMISSIONS} from 'react-native-permissions';

class App extends PureComponent {
  componentDidMount() {
    this.requestPermissions();
  }

  requestPermissions = async () => {
    try {
      const result = await request(PERMISSIONS.IOS.CAMERA);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    console.log('Hello');
    const device = Camera.getAvailableCameraDevices();

    // ?.find(
    //   device => device.position === 'back',
    // );

    console.log('Hello 2');

    return null;

    if (!device) {
      return null;
    }

    console.log(device);

    return (
      <SafeAreaView style={styles.container}>
        <Camera style={styles.camera} device={device} isActive={true} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera: {
    width: 300,
    height: 300,
  },
});

export default App;
