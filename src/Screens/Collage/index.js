import React, {PureComponent} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  Button,
  Image,
  FlatList,
  View,
} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import SelectPortraitPhotos from './components/SelectPortraitPhotos';
import SelectBackgroundPhoto from './components/SelectBackgroundPhoto';
import BaseModal from './components/BaseModal';
import {width, height} from '../../utils/constants';

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

  getItemLayout = (_, index) => {
    return {
      length: height * 0.1,
      offset: height * 0.1 * index,
      index,
    };
  };

  keyExtractor = (_, index) => index.toString();

  renderItem = ({item}) => {
    return (
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: item,
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    );
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

        {backgroundPhoto && (
          <Image
            source={{
              uri: backgroundPhoto,
            }}
            style={styles.backgroundPhoto}
          />
        )}

        <View style={styles.flatlist}>
          <FlatList
            data={portraitPhotos}
            renderItem={this.renderItem}
            getItemLayout={this.getItemLayout}
            keyExtractor={this.keyExtractor}
            numColumns={3}
          />
        </View>

        <Button title="Generate Collage" />

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
    alignItems: 'center',
  },
  backgroundPhoto: {
    width: width * 0.9,
    height: height * 0.2,
  },
  flatlist: {
    width,
    height: height * 0.5,
  },
  imageContainer: {
    width: width * 0.33,
    height: height * 0.1,
    padding: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
