import React, {PureComponent} from 'react';
import {StyleSheet, Button, View} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import {width, height} from '../utils/constants';

class VisionCamera extends PureComponent {
  render() {
    const {device, takePhoto, cameraRef, hasPermission} = this.props;
    const isButtonsDisabled = !hasPermission;

    return (
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          <Camera
            ref={cameraRef}
            device={device}
            style={styles.camera}
            isActive={hasPermission}
            photo={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Take Photo"
            onPress={takePhoto}
            disabled={isButtonsDisabled}
          />
        </View>
      </View>
    );
  }
}

export default VisionCamera;

const styles = StyleSheet.create({
  container: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    width: width * 0.9,
    height: height * 0.3,
    borderRadius: 5,
    overflow: 'hidden',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    marginVertical: 30,
  },
});
