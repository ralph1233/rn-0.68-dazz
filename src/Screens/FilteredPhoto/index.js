import React, {memo, useContext, useMemo} from 'react';
import {AppContext, imageFilters} from '../../utils/constants';
import {SafeAreaView, StyleSheet, Button, View} from 'react-native';

const FilteredPhoto = ({navigation, route}) => {
  const {base64} = route.params;
  const {selectedFilter} = useContext(AppContext);

  const {Element} = useMemo(
    () =>
      imageFilters.find(
        imageFilter => imageFilter.name === selectedFilter.name,
      ),
    [selectedFilter?.name],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Element base64={base64} />
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
};

export default memo(FilteredPhoto);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});
