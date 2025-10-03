import React, {PureComponent} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {height, width} from '../utils/constants';

class CapturedPhoto extends PureComponent {
  render() {
    const {url} = this.props;

    if (!url) {
      return null;
    }

    return (
      // <View style={styles.container}>
      <Image
        source={{
          uri: url,
        }}
        style={styles.image}
      />
      // </View>
    );
  }
}

export default CapturedPhoto;

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: height * 0.3,
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    // width: '100%',
    // height: '100%',
    width: width * 0.9,
    height: height * 0.3,
    borderRadius: 5,
  },
});
