import React, {PureComponent} from 'react';
import {SafeAreaView, StyleSheet, Alert, Button} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import SelectPhotosModal from './components/SelectPhotosModal';

class Collage extends PureComponent {
  constructor() {
    super();

    this.state = {
      photos: [],
      portraitPhotos: [],
      backgroundPhoto: null,
      isModalVisible: false,
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

  setPortraitPhotos = portraitPhotos => {
    this.setState({
      portraitPhotos,
    });
  };

  render() {
    const {photos, isModalVisible, portraitPhotos} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <Button
          title="Select Portrait Photos"
          onPress={() => this.setIsModalVisible(true)}
        />

        <SelectPhotosModal
          photos={photos}
          isModalVisible={isModalVisible}
          portraitPhotos={portraitPhotos}
          setPortraitPhotos={this.setPortraitPhotos}
          setIsModalVisible={this.setIsModalVisible}
        />
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
