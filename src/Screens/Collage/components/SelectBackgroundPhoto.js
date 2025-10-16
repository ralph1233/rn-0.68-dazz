import React, {PureComponent} from 'react';
import {
  FlatList,
  StyleSheet,
  Image,
  Button,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {height, width} from '../../../utils/constants';

class SelectBackgroundPhoto extends PureComponent {
  renderItem = ({item}) => {
    const {setBackgroundPhoto, setIsModalVisible} = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setBackgroundPhoto(item);
          setIsModalVisible(false);
        }}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item,
            }}
            style={styles.image}
            resizeMode="cover"
          />
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
    const {setIsModalVisible, setBackgroundPhoto} = this.props;
    setBackgroundPhoto(null);
    setIsModalVisible(false);
  };

  render() {
    const {photos, backgroundPhoto} = this.props;

    if (!photos.length) {
      return null;
    }

    return (
      <React.Fragment>
        <Button title="Dismiss" onPress={this.dismiss} />
        <FlatList
          data={photos}
          extraData={backgroundPhoto}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          numColumns={3}
          getItemLayout={this.getItemLayout}
          initialNumToRender={3}
          maxToRenderPerBatch={9}
          windowSize={15}
        />
      </React.Fragment>
    );
  }
}

export default SelectBackgroundPhoto;

const styles = StyleSheet.create({
  imageContainer: {
    width: width * 0.33,
    height: height * 0.1,
    padding: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
