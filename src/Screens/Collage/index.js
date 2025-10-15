import React, {PureComponent} from 'react';
import {SafeAreaView, StyleSheet, Image, Alert, Button} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

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

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Button
          title="Select Photos"
          onPress={() => this.setIsModalVisible(true)}
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
