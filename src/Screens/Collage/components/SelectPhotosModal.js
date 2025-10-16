import React, {PureComponent} from 'react';
import {
  FlatList,
  StyleSheet,
  Image,
  Modal,
  SafeAreaView,
  Button,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {height, width} from '../../../utils/constants';

class SelectPhotosModal extends PureComponent {
  renderItem = ({item}) => {
    const {portraitPhotos, setPortraitPhotos} = this.props;
    const isSelected = portraitPhotos.find(i => i === item);

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (isSelected) {
            const filteredPortraitPhotos = portraitPhotos.filter(
              i => i !== item,
            );
            setPortraitPhotos(filteredPortraitPhotos);
            return;
          }

          if (portraitPhotos.length >= 15) {
            Alert.alert('Error', 'You can only select up to 15 photos');
            return;
          }

          const newPortraitPhotos = [...portraitPhotos, item];
          setPortraitPhotos(newPortraitPhotos);
        }}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item,
            }}
            style={styles.image}
            resizeMode="cover"
          />
          {isSelected && <View style={styles.isSelected} />}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  getItemLayout = (_, index) => {
    return {
      length: height * 0.1,
      offset: height * 0.1 * index,
      index,
    };
  };

  keyExtractor = (_, index) => index.toString();

  dismiss = () => {
    const {setIsModalVisible, setPortraitPhotos} = this.props;
    setPortraitPhotos([]);
    setIsModalVisible(false);
  };

  confirmSelect = () => {
    const {setIsModalVisible} = this.props;
    setIsModalVisible(false);
  };

  render() {
    const {photos, isModalVisible, portraitPhotos} = this.props;

    if (!photos.length) {
      return null;
    }

    return (
      <Modal transparent={true} visible={isModalVisible}>
        <SafeAreaView style={styles.container}>
          <Button title="Dismiss" onPress={this.dismiss} />
          <FlatList
            data={photos}
            extraData={portraitPhotos}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            numColumns={3}
            getItemLayout={this.getItemLayout}
            initialNumToRender={3}
            maxToRenderPerBatch={9}
            windowSize={15}
          />
          <TouchableOpacity
            style={styles.checkButton}
            onPress={this.confirmSelect}>
            <Text
              style={styles.selectText}
              adjustsFontSizeToFit={true}
              numberOfLines={1}>
              Select
            </Text>

            <View style={styles.selectedPortraitPhotos}>
              <Text
                style={styles.selectedPortraitPhotosText}
                adjustsFontSizeToFit={true}
                numberOfLines={1}>
                {portraitPhotos.length}
              </Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    );
  }
}

export default SelectPhotosModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    width: width * 0.33,
    height: height * 0.1,
    padding: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  checkButton: {
    width: height * 0.1,
    height: height * 0.1,
    borderRadius: height * 0.1,
    position: 'absolute',
    left: 20,
    bottom: 20,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
  },
  selectedPortraitPhotos: {
    right: 0,
    top: 0,
    position: 'absolute',
    width: '30%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: height * 0.1,
  },
  selectedPortraitPhotosText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  isSelected: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
