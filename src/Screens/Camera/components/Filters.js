import React, {PureComponent} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  // Image,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {imageFilters, height} from '../../../utils/constants';

class Filters extends PureComponent {
  renderItem = ({item}) => {
    const {setSelectedFilter, selectedFilter} = this.props;
    const isSelected = selectedFilter?.name === item.name;
    const borderColor = isSelected ? 'blue' : 'transparent';

    return (
      <TouchableWithoutFeedback onPress={() => setSelectedFilter(item)}>
        <View
          style={[
            styles.item,
            {
              borderColor,
            },
          ]}>
          {/* <Image source={item.icon} style={styles.image} /> */}
          <Text style={styles.text}>{item.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  keyExtractor = (_, index) => index.toString();

  render() {
    const {selectedFilter} = this.props;

    return (
      <FlatList
        horizontal={true}
        data={imageFilters}
        extraData={selectedFilter}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        showsHorizontalScrollIndicator={false}
      />
    );
  }
}

export default Filters;

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    borderWidth: 2,
    borderStyle: 'solid',
    padding: 10,
  },
  //  eslint-disable-next-line react-native/no-unused-styles
  image: {
    width: height * 0.05,
    height: height * 0.05,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
