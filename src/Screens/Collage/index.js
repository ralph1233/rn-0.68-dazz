import React, {PureComponent} from 'react';
import {SafeAreaView, StyleSheet, Alert, Button} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import SelectPhotosModal from './components/SelectPhotosModal';

class Collage extends PureComponent {
  constructor() {
    super();

    this.state = {
      photos: [],
      selectedPhotos: [],
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

  setSelectedPhotos = selectedPhotos => {
    this.setState({
      selectedPhotos,
    });
  };

  render() {
    const {photos, isModalVisible, selectedPhotos} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <Button
          title="Select Photos"
          onPress={() => this.setIsModalVisible(true)}
        />
        <SelectPhotosModal
          photos={photos}
          isModalVisible={isModalVisible}
          selectedPhotos={selectedPhotos}
          setIsModalVisible={this.setIsModalVisible}
          setSelectedPhotos={this.setSelectedPhotos}
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
