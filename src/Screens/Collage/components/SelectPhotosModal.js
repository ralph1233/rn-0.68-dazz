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
} from 'react-native';
import {height, width} from '../../../utils/constants';

class SelectPhotosModal extends PureComponent {
  renderItem = ({item}) => {
    const {selectedPhotos, setSelectedPhotos} = this.props;
    const isSelected = selectedPhotos.find(i => i === item);

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (isSelected) {
            const filteredSelectedPhotos = selectedPhotos.filter(
              i => i !== item,
            );
            setSelectedPhotos(filteredSelectedPhotos);
            return;
          }

          const newSelectedPhotos = [...selectedPhotos, item];
          setSelectedPhotos(newSelectedPhotos);
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
    const {setIsModalVisible, setSelectedPhotos} = this.props;
    setSelectedPhotos([]);
    setIsModalVisible(false);
  };

  confirmSelect = () => {
    const {setIsModalVisible} = this.props;
    setIsModalVisible(false);
  };

  render() {
    const {photos, isModalVisible, selectedPhotos} = this.props;

    if (!photos.length) {
      return null;
    }

    return (
      <Modal transparent={true} visible={isModalVisible}>
        <SafeAreaView style={styles.container}>
          <Button title="Dismiss" onPress={this.dismiss} />
          <FlatList
            data={photos}
            extraData={selectedPhotos}
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

            <View style={styles.selectedPhotos}>
              <Text
                style={styles.selectedPhotosText}
                adjustsFontSizeToFit={true}
                numberOfLines={1}>
                {selectedPhotos.length}
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
  selectedPhotos: {
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
  selectedPhotosText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  isSelected: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
