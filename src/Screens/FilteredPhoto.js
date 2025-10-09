import React, {PureComponent} from 'react';
import {AppContext, imageFilters} from '../utils/constants';
import {SafeAreaView, StyleSheet, Button, View} from 'react-native';

class FilteredPhoto extends PureComponent {
  static contextType = AppContext;

  render() {
    const {navigation, route} = this.props;
    const {base64} = route.params;
    const {selectedFilter} = this.context;

    const {Element} = imageFilters.find(
      imageFilter => imageFilter.name === selectedFilter.name,
    );
    console.log(base64.length);

    return (
      <SafeAreaView style={styles.container}>
        <Element base64={base64} />
        <View style={styles.buttonContainer}>
          <Button title="Back" onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    );
  }
}

export default FilteredPhoto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});
