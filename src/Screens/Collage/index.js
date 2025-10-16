import React, {PureComponent} from 'react';
import {SafeAreaView, StyleSheet, Alert, Button} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import SelectPortraitPhotos from './components/SelectPortraitPhotos';
import SelectBackgroundPhoto from './components/SelectBackgroundPhoto';
import BaseModal from './components/BaseModal';

class Collage extends PureComponent {
  constructor() {
    super();

    this.state = {
      photos: [],
      portraitPhotos: [],
      backgroundPhoto: null,
      isModalVisible: false,
      mode: 'portrait',
    };

    this.modes = {
      portrait: SelectPortraitPhotos,
      background: SelectBackgroundPhoto,
    };
  }

  componentDidMount() {
    (async () => {
      try {
        const photos = await CameraRoll.getPhotos({
          first: 1000,
        });
        this.setState({
          photos: photos.edges.map(photo => photo.node.image.uri),
        });
      } catch (error) {
        console.log(error);
        Alert.alert('Error', error.message);
      }
    })();
  }

  setIsModalVisible = isModalVisible => {
    this.setState({
      isModalVisible,
    });
  };

  setMode = mode => {
    this.setState({
      mode,
    });
    this.setIsModalVisible(true);
  };

  setBackgroundPhoto = backgroundPhoto => {
    this.setState({
      backgroundPhoto,
    });
  };

  setPortraitPhotos = portraitPhotos => {
    this.setState({
      portraitPhotos,
    });
  };

  render() {
    const {isModalVisible, mode, photos, portraitPhotos, backgroundPhoto} =
      this.state;
    const ModeComponent = this.modes[mode];
    const modeProps = {
      portrait: {
        photos,
        setPortraitPhotos: this.setPortraitPhotos,
        portraitPhotos,
        setIsModalVisible: this.setIsModalVisible,
      },
      background: {
        photos,
        setBackgroundPhoto: this.setBackgroundPhoto,
        backgroundPhoto,
        setIsModalVisible: this.setIsModalVisible,
      },
    };

    return (
      <SafeAreaView style={styles.container}>
        <Button
          title="Select Portrait Photos"
          onPress={() => this.setMode('portrait')}
        />

        <Button
          title="Select Background Photo"
          onPress={() => this.setMode('background')}
        />

        <BaseModal
          isModalVisible={isModalVisible}
          setIsModalVisible={this.setIsModalVisible}>
          <ModeComponent {...modeProps[mode]} />
        </BaseModal>
      </SafeAreaView>
    );
  }
}

export default Collage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
